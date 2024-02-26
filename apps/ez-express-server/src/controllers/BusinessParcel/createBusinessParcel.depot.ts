import { NextFunction, Request, Response } from "express";
import Logging from "../../library/Logging";
import { getAccessTokenArgs } from "../../getAccessTokenArgs";
import BusinessParcel from "../../models/BusinessParcel";
import PartnerDepot from "../../models/PartnerDepot";
import { BusinessParcelStatus } from "@repo/types";
import { googleClient } from "../../library/GoogleApi";
import { getPriceByPostalCode } from "@repo/utils";
import mongoose from "mongoose";
import QRCode from "qrcode";
import { generateTrackingNumber } from "../../utils/generateTrackingNumber";

// For partner to create parcel
export const createBusinessParcel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      partnerDepot,

      // Delivery Customer Contact
      name,
      notes,
      firstName,
      lastName,
      phone,
      email,
      wechat,

      // Delivery Address
      unit,
      streetAddress,
      postalCode,
      city,
      province,
      country,

      // Tracking
      packageSize,
      value,
      parcelsCount,
      customerRef,
    } = req.body;

    const { email: partnerEmail } = getAccessTokenArgs(
      req.headers.authorization
    );
    const partner = await PartnerDepot.findOne({ email: partnerEmail });

    // Check if partner is authorized to create parcel
    if (partner?.get("_id") !== partnerDepot) {
      return res
        .status(401)
        .send({ message: "Unauthorized to update parcel status." });
    }

    const geo = await googleClient.geocode({
      params: {
        key: process.env.GOOGLE_API_KEY || "",
        address: `${streetAddress} ${city} ${province} ${postalCode}`,
        region: "ca",
      },
    });

    // Check if address is valid
    if (!geo.data.results?.[0]) {
      return res.status(400).send({ message: "Invalid address." });
    }

    const trackingNumber = generateTrackingNumber();
    const qrcode = await QRCode.toDataURL(
      `${process.env.CLIENT_BASE_URL}/tracking/${trackingNumber}`
    );

    // Check if QR code is generated
    if (!qrcode) {
      return res
        .status(400)
        .send({ message: "Couldn't generate QR code for the order." });
    }

    // Check if price is valid
    const price = getPriceByPostalCode(postalCode);
    if (!(price > 0)) {
      return res.status(400).send({
        message: "Couldn't complete the request due to invalid price.",
      });
    }

    const parcel = await BusinessParcel.create({
      _id: new mongoose.Types.ObjectId(),
      status: BusinessParcelStatus.Submitted,
      name,
      firstName,
      lastName,
      packageSize,
      value,
      phone,
      email,
      wechat,

      // Address
      city,
      province,
      country,
      streetAddress,
      unit,
      postalCode,
      geo,
      formattedAddress: `${unit}${streetAddress}, ${city}, ${postalCode}`,

      // Price
      price,

      // Tracking
      parcelsCount: parcelsCount || 1,
      customerRef,
      trackingTimeline: [
        {
          status: BusinessParcelStatus.Submitted,
          from: partner?.get("_id"),
          notes,
          picture: "",
          createdAt: new Date(),
        },
      ],
      scheduledDeliveryTimewindow: {
        from: new Date(), // TODO: update to use ISO date string
        to: new Date(), // TODO: update to use end of the day ISO date string
      },
      qrcode,
      trackingNumber,
    });

    return res.status(200).send(parcel);
  } catch (error) {
    Logging.error(error);

    return res
      .status(500)
      .send({ message: "Sorry, something went wrong on our end." });
  }
};
