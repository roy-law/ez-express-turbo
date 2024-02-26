import { NextFunction, Request, Response } from "express";
import Logging from "../../library/Logging";
import { getAccessTokenArgs } from "../../getAccessTokenArgs";
import BusinessParcel from "../../models/BusinessParcel";
import PartnerDepot from "../../models/PartnerDepot";
import { BusinessParcelStatus } from "@repo/types";
import { googleClient } from "../../library/GoogleApi";
import { getPriceByPostalCode } from "@repo/utils";

// For partner to update parcel
export const updateBusinessParcel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      status,
      businessParcelId,
      name,
      notes,
      firstName,
      lastName,
      phone,
      email,
      wechat,
      streetAddress,
      city,
      unit,
      postalCode,

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
    const businessParcel = await BusinessParcel.findOne({
      _id: businessParcelId,
    }).populate("partnerDepot");

    // Check if partner is authorized to update parcel
    if (
      partner?.get("_id") !== businessParcel?.get("partnerDepot").get("_id")
    ) {
      return res
        .status(401)
        .send({ message: "Unauthorized to update parcel status" });
    }

    // Check if status is valid
    const validPartnerUpdateStatus = [
      BusinessParcelStatus.Cancelled,
      BusinessParcelStatus.Submitted,
    ];
    if (!validPartnerUpdateStatus.includes(status)) {
      return res
        .status(401)
        .send({ message: "Unauthorized to update parcel status" });
    }

    // Check if package is already picked up, if so, do not allow to change package size or value or address
    if (
      businessParcel?.get("status") === BusinessParcelStatus.PickedUp &&
      (packageSize ||
        value ||
        notes ||
        city ||
        streetAddress ||
        unit ||
        postalCode ||
        parcelsCount ||
        customerRef)
    ) {
      return res.status(401).send({
        message:
          "Parcel is already picked up. Please contact support to change informations.",
      });
    }

    // Check if package size is custom, if so, do not allow to change package size
    if (businessParcel?.get("packageSize") === "Custom" && packageSize) {
      return res.status(401).send({
        message:
          "Parcel is custom package size. Please contact support to make the change.",
      });
    }

    // TODO: don't run this if address is not changed
    const newGeo = await googleClient.geocode({
      params: {
        key: process.env.GOOGLE_API_KEY || "",
        address: `${streetAddress || businessParcel?.get("streetAddress")} ${city || businessParcel?.get("city")} ${businessParcel?.get("province")} ${postalCode || businessParcel?.get("postalCode")}`,
        region: "ca",
      },
    });

    // Check if address is valid
    if (!newGeo.data.results?.[0]) {
      return res.status(400).send("Invalid address");
    }

    const parcel = await BusinessParcel.findOneAndUpdate(
      {
        _id: businessParcelId,
      },
      {
        status,
        name,
        firstName,
        lastName,
        packageSize,
        value,
        phone,
        email,
        wechat,

        // Address
        streetAddress,
        city,
        unit,
        postalCode,
        geo: newGeo.data.results[0],
        formattedAddress: `${unit || businessParcel?.get("unit")}${streetAddress || businessParcel?.get("streetAddress")}, ${city || businessParcel?.get("city")}, ${postalCode || businessParcel?.get("postalCode")}`,

        // Price
        price: getPriceByPostalCode(
          postalCode || businessParcel?.get("postalCode")
        ),

        // Tracking
        parcelsCount,
        customerRef,
        trackingTimeline: [
          ...businessParcel?.get("trackingTimeline"),
          // Only add tracking if status is changed
          !!status && {
            status,
            from: partner?.get("_id"),
            notes,
            picture: "",
            createdAt: new Date(),
          },
        ],
      },
      { new: true }
    );

    return res.status(200).send(parcel);
  } catch (error) {
    Logging.error(error);

    return res
      .status(500)
      .send({ message: "Sorry, something went wrong on our end." });
  }
};
