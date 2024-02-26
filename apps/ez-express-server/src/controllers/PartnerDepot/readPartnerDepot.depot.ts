import { NextFunction, Request, Response } from "express";
import { getAccessTokenArgs } from "../../getAccessTokenArgs";
import Logging from "../../library/Logging";
import PartnerDepot from "../../models/PartnerDepot";

// For partner to read their own depot
export const readPartnerDepot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const partnerDepotId = req.query.partnerDepotId;

  try {
    const { email: partnerEmail } = getAccessTokenArgs(
      req.headers.authorization
    );
    const partnerDepot = await PartnerDepot.findOne({ email: partnerEmail });

    // Check if partner is authorized to read depot
    if (!(partnerDepot?.get("_id") === partnerDepotId)) {
      return res.status(401).send({ message: "Unauthorized to read depot." });
    }

    const doc = await PartnerDepot.findById(partnerDepotId);

    return res.status(200).send(doc);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send({ message: "Sorry, something went wrong" });
  }
};
