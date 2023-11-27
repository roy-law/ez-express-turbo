import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Logging from "../../library/Logging";
import Driver from "../../models/Driver";

export const readAllDrivers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const drivers = await Driver.find({});

    if (drivers) {
      return res.status(200).send(drivers);
    } else {
      return res.status(400).send("not found");
    }
  } catch (error) {
    Logging.error(error);
  }
};
