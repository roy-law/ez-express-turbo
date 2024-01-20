import { Request, Response } from "express";
import Logging from "../../library/Logging";
import AreaPostalCode from "../../models/AreaPostalCode";
import mongoose from "mongoose";

export const createAreaPostalCode = async (req: Request, res: Response) => {
  const { postalCode, city, code, price } = req.body;

  try {
    const areaPostalCode = await AreaPostalCode.create({
      _id: new mongoose.Types.ObjectId(),
      city,
      code,
      price,
      postalCode,
    });

    return res.status(200).send(areaPostalCode);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send();
  }
};
