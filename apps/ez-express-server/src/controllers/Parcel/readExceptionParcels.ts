import { NextFunction, Request, Response } from "express";

import Parcel from "../../models/Parcel";
import Logging from "../../library/Logging";
import { PackageStatus } from "@repo/types";
import { getStartEndOfDayInUTCWithOffset } from "../../utils/getTime";

const tz = "America/Toronto";

export const readExceptionParcels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const day = req.query.day as string;
  const [dayStartFromYesterday6PM, dayEndFromToday6PM] =
    getStartEndOfDayInUTCWithOffset(day, tz, { hours: 5, minutes: 29 });

  try {
    const parcels = await Parcel.find({
      status: {
        $nin: [
          PackageStatus.Delivered,
          PackageStatus.Returned,
          PackageStatus.Rejected,
          PackageStatus.Cancelled,
        ],
      },
      createdAt: {
        $lte: dayStartFromYesterday6PM,
      },
    });

    if (parcels) {
      return res.status(200).send(parcels);
    } else {
      return res.status(400).send("not found");
    }
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
