import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import QRCode from "qrcode";
import { countries } from "country-data";

import Parcel, { IParcel } from "../../models/Parcel";
import { PackageStatus } from "../../types/Parcel";
import { ProvinceOntario } from "../../types/Address";
import { googleClient } from "../../library/GoogleApi";
import Logging from "../../library/Logging";
import User from "../../models/User";
import Depot from "../../models/Depot";
import { generateTrackingNumber } from "../../utils/generateTrackingNumber";

// create a post function to upload an array of parcels where each parcel is IParcel type
export const createParcels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { parcels } = req.body;

  try {
    // create an array of parcels
    const newParcels = await Promise.all(
      // map each parcel to create a new parcel
      parcels.map(async (parcel: IParcel) => {
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
        } = parcel;

        const trackingNumber = generateTrackingNumber();

        // e.g. https://base-url.com/tracking/EZE-123-ABC
        const qrcode = await QRCode.toDataURL(
          `${process.env.CLIENT_BASE_URL}/tracking/${trackingNumber}`
        );

        let depot;
        if (!!depotEmail) {
          depot = await Depot.findOne({ email: depotEmail });
        } else {
          depot = await Depot.findById(depotId);
        }
        const companyId = await User.findOne({ email: depot?.get("email") });

        // create a new parcel
        const newParcel = await Parcel.create({
          _id: new mongoose.Types.ObjectId(),
          // Raw (Required)
          name,
          firstName,
          lastName,
          depotId,
          companyId,
          // Address (Required)
          city,
          streetAddress,
          unit,
          postalCode,
          province: ProvinceOntario,
          country: countries["CA"].name,
          // Info (Required)
          packageSize,
          status: PackageStatus.Submitted,
          notes,
          price,
          customerRef,
          // Contact (Required)
          phone,
          email,
          wechat,
          // Tracking (Required)
          trackingNumber,
          qrcode,
          barcode: trackingNumber,
          trackingTimeline: [
            {
              status: PackageStatus.Submitted,
              createdAt: new Date(),
            },
          ],
          // Geo (Required)
          geo: await googleClient.geocode({
            params: {
              address: `${streetAddress}, ${city}, ${ProvinceOntario}, ${postalCode}, ${countries["CA"].name}`,
              key: process.env.GOOGLE_API_KEY || "",
              region: "ca",
            },
          }),
          // Delivery (Optional)
          deliveryPerson: "",
          scheduledDeliveryDay: "",
          scheduledDeliveryShift: "",
        });

        return newParcel;
      })
    );

    // return the new parcels
    return res.status(200).send(newParcels);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
