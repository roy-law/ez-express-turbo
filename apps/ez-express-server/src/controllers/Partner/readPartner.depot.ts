import { NextFunction, Request, Response } from "express";
import { getAccessTokenArgs } from "../../getAccessTokenArgs";
import Partner from "../../models/Partner";
import Logging from "../../library/Logging";

// For partner to read their own profile
export const readPartner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = getAccessTokenArgs(req.headers.authorization);

    const user = await Partner.findOne({ email });

    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(400).send("not found");
    }
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
