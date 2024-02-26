import { NextFunction, Request, Response } from "express";
import { getAccessTokenArgs } from "../../getAccessTokenArgs";
import Partner from "../../models/Partner";
import Logging from "../../library/Logging";
import { AccountStatus } from "@repo/types";

// For partner to update their own profile
export const updatePartner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email: partnerEmail } = getAccessTokenArgs(
      req.headers.authorization
    );
    const {
      email,
      phone,
      wechat,
      name,
      firstName,
      lastName,
      picture,
      depots,
      locale,
      companyName,
      hstNumber,
      accountStatus,
    } = req.body;

    // check if db has the user with the same email
    const dbPartner = await Partner.findOne({ email: partnerEmail });
    if (!dbPartner) {
      return res
        .status(400)
        .send({ message: "Unable to retrieve this account." });
    }

    const validAccountStatus = [
      AccountStatus.PendingCompany,
      AccountStatus.PendingDepot,
    ];
    // check if accountStatus is valid
    if (!validAccountStatus.includes(accountStatus)) {
      return res.status(400).send({ message: "Invalid account status." });
    }

    const partner = await Partner.findOneAndUpdate(
      { email: partnerEmail },
      {
        email,
        phone,
        wechat,
        name,
        firstName,
        lastName,
        picture,
        depots,
        locale,
        companyName,
        hstNumber,
        accountStatus,
      },
      {
        new: true,
      }
    );

    return res.status(200).send(partner);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
