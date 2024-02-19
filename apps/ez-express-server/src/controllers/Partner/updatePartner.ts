import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { getAccessTokenArgs } from "../../getAccessTokenArgs";
import Partner from "../../models/Partner";
import Logging from "../../library/Logging";

export const updatePartner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // using header's email to ensure the user is updating their own profile
    const { email } = getAccessTokenArgs(req.headers.authorization);

    const partner = await Partner.findOneAndUpdate({ email }, req.body, {
      new: true,
    });

    if (partner) {
      return res.status(200).send(partner);
    } else {
      return res.status(400).send("not found");
    }
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
