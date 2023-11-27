import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { getAccessTokenArgs } from "../getAccessTokenArgs";
import User, { UserStatus } from "../models/User";
import Logging from "../library/Logging";

const readUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = getAccessTokenArgs(req.headers.authorization);

    const user = await User.findOne({ email });

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

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    firstName,
    lastName,
    name,
    picture,
    email,
    isEmailVerified,
    locale,
    companyName,
    hstNumber,
    depot,
  } = req.body;

  const user = new User({});

  try {
    // check if db has the user with the same email
    const dbUser = await User.findOne({ email });

    if (dbUser) {
      return res.status(400).send("Duplicate user");
    }

    // if not in db, create it
    await User.create({
      _id: new mongoose.Types.ObjectId(),
      name,
      firstName,
      lastName,
      email,
      companyName,
      hstNumber,
      depot,
      picture,
      isEmailVerified: isEmailVerified || false,
      isTermsChecked: false,
      locale: locale || "en",
      status: UserStatus.OnboardEmail,
    });

    return res.status(200).send(user);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = getAccessTokenArgs(req.headers.authorization);

    const user = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
    });

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

const checkIsUserUniqueByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = getAccessTokenArgs(req.headers.authorization);

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).send(true);
    } else {
      return res.status(200).send(false);
    }
  } catch (error) {
    return res.status(404);
  }
};

export default { readUser, createUser, updateUser, checkIsUserUniqueByEmail };
