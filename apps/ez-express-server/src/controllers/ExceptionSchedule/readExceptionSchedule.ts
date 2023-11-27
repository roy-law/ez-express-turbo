import { NextFunction, Request, Response } from "express";
import Logging from "../../library/Logging";
import ExceptionSchedule from "../../models/ExceptionSchedule";
import { getStartEndofDayInUTC } from "../../utils/getTime";

const tz = "America/Toronto";

export const readExceptionSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const day = req.query.day as string;
  const [dayStart, dayEnd] = getStartEndofDayInUTC(day, tz);

  try {
    const schedule = await ExceptionSchedule.findOne({
      day,
      createdAt: {
        $gte: dayStart,
        $lte: dayEnd,
      },
    }).populate({
      path: "parcels",
      populate: ["depotId", "companyId", "deliveryPerson"],
    });

    if (schedule) {
      return res.status(200).send(schedule);
    } else {
      return res.status(400).send("not found");
    }
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
