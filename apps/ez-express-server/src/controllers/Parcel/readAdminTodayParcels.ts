import { NextFunction, Request, Response } from "express";

import Parcel from "../../models/Parcel";
import { getStartEndOfDayInUTCWithOffset } from "../../utils/getTime";
import Logging from "../../library/Logging";
import ExceptionSchedule from "../../models/ExceptionSchedule";

const tz = "America/Toronto";

export const readAdminTodayParcels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const day = req.query.day as string;
  const [dayStartFromYesterday6PM, dayEndFromToday6PM] =
    getStartEndOfDayInUTCWithOffset(day, tz, { hours: 5, minutes: 29 });

  try {
    const parcels = await Parcel.find({
      createdAt: {
        $gte: dayStartFromYesterday6PM,
        $lte: dayEndFromToday6PM,
      },
    }).populate(["depotId", "companyId", "deliveryPerson"]);

    const exceptionSchedule = await ExceptionSchedule.findOne({ day });

    const exceptionParcels = await Parcel.find({})
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
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
