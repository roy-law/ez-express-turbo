import { NextFunction, Request, Response } from "express";
import Logging from "../../library/Logging";
import ExceptionSchedule from "../../models/ExceptionSchedule";
import Parcel from "../../models/Parcel";

export const updateExceptionSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { exceptionScheduleId, parcelsTracking, parcels } = req.body;

  try {
    const parcelsFromTracking = await Parcel.find({})
      .where("trackingNumber")
      .in(parcelsTracking)
      .exec();

    const parcelIdsFromTracking = parcelsFromTracking.map((p) => p._id);

    const schedule = await ExceptionSchedule.findByIdAndUpdate(
      exceptionScheduleId,
      {
        parcels: parcels || parcelIdsFromTracking,
      },
      {
        new: true,
      }
    );

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
