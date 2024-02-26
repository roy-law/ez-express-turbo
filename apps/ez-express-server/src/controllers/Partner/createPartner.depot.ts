import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Partner from "../../models/Partner";
import Logging from "../../library/Logging";

// For partner to create a new partner
export const createPartner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    name,
    companyName,

    picture,
    email,
    locale,
    hstNumber,
    depots,

    isEmailVerified,
    accountStatus,
  } = req.body;

  try {
    // check if db has the user with the same email
    const dbUser = await Partner.findOne({ email });

    if (dbUser) {
      return res.status(400).send("Duplicate partner");
    }

    // if not in db, create it
    const partner = await Partner.create({
      _id: new mongoose.Types.ObjectId(),
      name,
      firstName,
      lastName,
      email,
      companyName,
      hstNumber,
      depots,
      picture,
      isEmailVerified: isEmailVerified || false,
      locale: locale || "en",
      accountStatus: accountStatus || 0,
    });

    return res.status(200).send(partner);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
