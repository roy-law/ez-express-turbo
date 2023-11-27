import { NextFunction, Request, Response } from "express";

import Parcel from "../../models/Parcel";
import Logging from "../../library/Logging";
import { getStartEndOfDayInUTCWithOffset } from "../../utils/getTime";
import ExceptionSchedule from "../../models/ExceptionSchedule";

const tz = "America/Toronto";

export const readAdminDayParcels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const day = req.query.day as string;
  const postalCode = req.query.postalCode as string;
  const [dayStartFromYesterday6PM, dayEndFromToday6PM] =
    getStartEndOfDayInUTCWithOffset(day, tz, { hours: 5, minutes: 29 });

  try {
    if (postalCode) {
      const parcels = await Parcel.find({
        createdAt: {
          $gte: dayStartFromYesterday6PM,
          $lte: dayEndFromToday6PM,
        },
        postalCode: {
          $regex: new RegExp(
            `${postalCode
              .replace(new RegExp(" ", "g"), "")
              .replace(new RegExp(",", "g"), "|")}`,
            "i"
          ),
        },
      }).populate(["depotId", "companyId", "deliveryPerson"]);

      const exceptionSchedule = await ExceptionSchedule.findOne({ day });

      const exceptionParcels = await Parcel.find({
        postalCode: {
          $regex: new RegExp(
            `${postalCode
              .replace(new RegExp(" ", "g"), "")
              .replace(new RegExp(",", "g"), "|")}`,
            "i"
          ),
        },
      })
        .where("_id")
        .populate(["depotId", "companyId", "deliveryPerson"])
        .in(exceptionSchedule?.get("parcels"))
        .exec();

      const finalParcels = [...parcels, ...exceptionParcels];

      if (finalParcels) {
        return res.status(200).send(finalParcels);
      } else {
        return res.status(400).send("not found");
      }
    }
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
