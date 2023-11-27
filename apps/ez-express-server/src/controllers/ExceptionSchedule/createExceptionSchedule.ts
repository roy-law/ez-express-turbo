import { NextFunction, Request, Response } from "express";
import Logging from "../../library/Logging";
import ExceptionSchedule from "../../models/ExceptionSchedule";
import mongoose from "mongoose";
import Parcel from "../../models/Parcel";

export const createExceptionSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { parcels, day, parcelsTracking } = req.body;

  try {
    const doc = await ExceptionSchedule.findOne({
      day,
    });

    if (doc) {
      return res.status(400).send("duplicate exception schedule");
    }

    const parcelsFromTracking = await Parcel.find({})
      .where("trackingNumber")
      .in(parcelsTracking)
      .exec();

    const parcelIdsFromTracking = parcelsFromTracking.map((p) => p._id);

    const schedule = await ExceptionSchedule.create({
      _id: new mongoose.Types.ObjectId(),
      day,
      parcels: parcels || parcelIdsFromTracking,
    });

    return res.status(200).send(schedule);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
