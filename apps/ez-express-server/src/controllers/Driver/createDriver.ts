import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Logging from "../../library/Logging";
import Driver from "../../models/Driver";

export const createDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, phone, picture } = req.body;

  try {
    const driver = await Driver.create({
      _id: new mongoose.Types.ObjectId(),
      username,
      email,
      phone,
      picture,
    });

    if (driver) {
      return res.status(200).send(driver);
    } else {
      return res.status(400).send("duplicate name");
    }
  } catch (error) {
    Logging.error(error);
  }
};
