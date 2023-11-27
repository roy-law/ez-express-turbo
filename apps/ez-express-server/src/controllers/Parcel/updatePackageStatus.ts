import { NextFunction, Request, Response } from "express";

import Parcel from "../../models/Parcel";
import { PackageStatus } from "../../types/Parcel";
import Logging from "../../library/Logging";

//** Role: Admin, Driver */
export const updatePackageStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parcelId = req.params.parcelId;
  const { status } = req.body;

  try {
    const parcel = await Parcel.findById(parcelId);

    if (parcel) {
      if (parcel.status === status || status === PackageStatus.Submitted) {
        return res.status(200).send(parcel);
      } else {
        if (
          status === PackageStatus.Cancelled ||
          status === PackageStatus.Rejected
        ) {
          parcel.set({ ...parcel, status, price: 0 });
        } else {
          parcel.set({ ...parcel, status });
        }

        await parcel.save();

        const doc = await Parcel.findByIdAndUpdate(
          parcel._id,
          {
            $push: {
              trackingTimeline: {
                status: parcel.get("status"),
                createdAt: parcel.get("updatedAt"),
              },
            },
          },
          { new: true }
        );

        return res.status(200).send(doc);
      }
    } else {
      return res.status(400).send("not found");
    }
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
