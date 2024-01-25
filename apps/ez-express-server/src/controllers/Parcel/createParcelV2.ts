import { Request, Response } from "express";
import mongoose from "mongoose";
import QRCode from "qrcode";
import { countries } from "country-data";

import Parcel from "../../models/Parcel";
import { PackageStatus } from "../../types/Parcel";
import { ProvinceOntario } from "../../types/Address";
import { googleClient } from "../../library/GoogleApi";
import Logging from "../../library/Logging";
import User from "../../models/User";
import Depot from "../../models/Depot";
import { generateTrackingNumber } from "../../utils/generateTrackingNumber";
import { optimoRouteClient } from "../../library/OptimoRouteApi";
import { transformParcelToOptimoRouteOrder } from "../../library/OptimoRouteApi/transformParcelToOptimoRouteOrder";

export const createParcelV2 = async (req: Request, res: Response) => {
  const {
    depotId,
    depotEmail,
    name,
    firstName,
    lastName,
    city,
    streetAddress,
    unit,
    postalCode,
    packageSize,
    price,
    phone,
    email,
    wechat,
    notes,
    customerRef,
    parcelsCount,
  } = req.body;

  const trackingNumber = generateTrackingNumber();

  try {
    if (!(price > 0)) {
      throw new Error("Couldn't complete the request due to the price < 1");
    }

    // e.g. https://base-url.com/tracking/EZE-123-ABC
    const qrcode = await QRCode.toDataURL(
      `${process.env.CLIENT_BASE_URL}/tracking/${trackingNumber}`
    );

    const depot = !!depotEmail
      ? await Depot.findOne({ email: depotEmail })
      : await Depot.findById(depotId);
    const companyId = await User.findOne({ email: depot?.get("email") });

    if (!companyId) {
      throw new Error(
        "Couldn't complete the request because companyId is null"
      );
    }

    if (!depot) {
      throw new Error("Couldn't complete the request because depot is null");
    }

    const parcel = await Parcel.create({
      _id: new mongoose.Types.ObjectId(),
      // Raw (Required)
      name,
      firstName,
      lastName,
      depotId: depot?._id,
      companyId,
      packageSize,
      price,
      phone,
      email, // Optional
      wechat, // Optional
      city,
      postalCode,
      streetAddress,
      unit,
      notes, // Optional
      customerRef, //Optional

      // Generated
      parcelsCount: parcelsCount || 1,
      trackingNumber,
      qrcode,
      province: ProvinceOntario,
      country: countries["CA"],
      formattedAddress: `${
        unit ? unit + " " : ""
      }${streetAddress}, ${city}, ${postalCode}`,
      status: PackageStatus.Submitted,
      trackingTimeline: [
        {
          status: PackageStatus.Submitted,
          createdAt: new Date(),
        },
      ],
    });

    await parcel.save();

    // Adding geo location
    const geo = await googleClient.geocode({
      params: {
        key: process.env.GOOGLE_API_KEY || "",
        address: `${parcel.get("streetAddress")} ${parcel.get("city")} ${
          parcel.get("province").alpha
        } ${parcel.get("postalCode")}`,
        region: "ca",
      },
    });

    // // Adding the first tracking timeline and geo location
    const doc = await Parcel.findByIdAndUpdate(
      parcel._id,
      {
        // $push: {
        //   trackingTimeline: {
        //     status: parcel.status,
        //     createdAt: parcel.get("updatedAt"),
        //   },
        // },
        geo: geo.data.results[0],
      },
      { new: true }
    );

    const shouldTurnOnOptimoroute = process.env.NODE_ENV === "development";

    // Add delivery orders to Optimoroute
    if (shouldTurnOnOptimoroute) {
      await optimoRouteClient.syncOrder(
        transformParcelToOptimoRouteOrder(parcel, depot)
      );
    }

    return res.status(200).send(doc);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
