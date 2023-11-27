import { NextFunction, Request, Response } from "express";

import Parcel from "../../models/Parcel";
import Logging from "../../library/Logging";
import { getStartEndOfDayInUTCWithOffset } from "../../utils/getTime";

const tz = "America/Toronto";

export const readCustomerDayParcels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const day = req.query.day as string;
  const depotId = req.query.depotId;

  const [dayStartFromYesterday6PM, dayEndFromToday6PM] =
    getStartEndOfDayInUTCWithOffset(day, tz, { hours: 5, minutes: 29 });

  try {
    const parcels = await Parcel.find({
      depotId,
      createdAt: {
        $gte: dayStartFromYesterday6PM,
        $lte: dayEndFromToday6PM,
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
