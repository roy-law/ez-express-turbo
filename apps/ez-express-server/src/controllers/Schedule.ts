import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Schedule from "../models/Schedule";
import { ServcingAreaToPostalCodeMap, ServicingAreaName } from "../types/Area";
import Logging from "../library/Logging";
import Parcel from "../models/Parcel";
import { WorkingShift } from "../types/DriverSchedule";

const createSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { parcelsOrder, day, predefinedArea, assignedTo, type } = req.body;

  const areaName = predefinedArea as ServicingAreaName;

  try {
    const doc = await Schedule.findOne({
      predefinedArea: areaName,
      day,
      type,
      shift: WorkingShift.Evening,
    });

    if (doc) {
      return res.status(400).send("duplicate schedule");
    }

    const schedule = await Schedule.create({
      _id: new mongoose.Types.ObjectId(),
      day,
      assignedTo,
      parcelsOrder,
      type,
      predefinedArea: areaName,
      postalCode: ServcingAreaToPostalCodeMap[areaName],
      shift: WorkingShift.Evening,
    });

    // update delivery person on parcel
    if (parcelsOrder && parcelsOrder.length) {
      await Promise.all(
        parcelsOrder.map(async (parcelId: string) => {
          await Parcel.findByIdAndUpdate(parcelId, {
            deliveryPerson: assignedTo,
          });
        })
      );
    }

    return res.status(200).send(schedule);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};

const updateSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id, ...rest } = req.body;

  try {
    const doc = await Schedule.findById(_id);

    const originalParcelsInSchedule = doc?.get("parcelsOrder");

    // unassigned all parcels
    if (originalParcelsInSchedule && originalParcelsInSchedule.length > 0) {
      await Promise.all(
        originalParcelsInSchedule.map(async (parcelId: string) => {
          await Parcel.findByIdAndUpdate(parcelId, {
            deliveryPerson: null,
          });
        })
      );
    }

    // assign new parcels to delivery person
    if (rest.parcelsOrder && rest.parcelsOrder.length) {
      await Promise.all(
        rest.parcelsOrder.map(async (parcelId: string) => {
          await Parcel.findByIdAndUpdate(parcelId, {
            deliveryPerson: rest?.assignedTo || schedule?.get("assignedTo"),
          });
        })
      );
    }

    const schedule = await Schedule.findByIdAndUpdate(
      _id,
      {
        ...rest,
        postalCode:
          ServcingAreaToPostalCodeMap[rest.predefinedArea as ServicingAreaName],
      },
      { new: true }
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

const readSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { day, predefinedArea, type, shift } = req.query;

  try {
    const schedule = await Schedule.findOne({
      day,
      predefinedArea,
      type,
      shift: shift || WorkingShift.Evening,
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

export default { createSchedule, readSchedule, updateSchedule };
