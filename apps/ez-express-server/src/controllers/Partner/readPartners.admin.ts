import { NextFunction, Request, Response } from "express";
import Partner from "../../models/Partner";
import Logging from "../../library/Logging";

// For Admin to read all the partners
export const readPartners = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const partners = await Partner.find({});

    return res.status(200).send(partners);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
