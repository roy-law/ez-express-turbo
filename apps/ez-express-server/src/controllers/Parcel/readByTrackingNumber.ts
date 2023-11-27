import { NextFunction, Request, Response } from "express";

import Parcel from "../../models/Parcel";
import Logging from "../../library/Logging";

export const readByTrackingNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { trackingNumber } = req.params;

  try {
    const parcel = await Parcel.findOne({ trackingNumber });

    if (parcel) {
      return res.status(200).send(parcel.trackingTimeline);
    } else {
      return res.status(400).send("not found");
    }
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
