import { NextFunction, Request, Response } from "express";
import { getAccessTokenArgs } from "../../getAccessTokenArgs";
import { googleClient } from "../../library/GoogleApi";
import Logging from "../../library/Logging";
import PartnerDepot from "../../models/PartnerDepot";
import { Province } from "@repo/types";

// For partner to update their own depot
export const updatePartnerDepot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const partnerDepotId = req.query.partnerDepotId;
  const {
    name,
    firstName,
    lastName,
    phone,
    email,
    wechat,
    streetAddress,
    city,
    unit,
    postalCode,
  } = req.body;

  try {
    const { email: partnerEmail } = getAccessTokenArgs(
      req.headers.authorization
    );
    const partnerDepot = await PartnerDepot.findOne({ email: partnerEmail });

    // Check if partner is authorized to update depot
    if (!(partnerDepot?.get("_id") === partnerDepotId)) {
      return res.status(401).send({ message: "Unauthorized to update depot" });
    }

    const newGeo = await googleClient.geocode({
      params: {
        key: process.env.GOOGLE_API_KEY || "",
        address: `${streetAddress} ${city} ${Province.Ontario.province} ${postalCode}`,
        region: "ca",
      },
    });

    const doc = await PartnerDepot.findByIdAndUpdate(
      partnerDepotId,
      {
        // Contact
        name,
        firstName,
        lastName,
        phone,
        email,
        wechat,

        // Address
        streetAddress,
        city,
        unit,
        postalCode,
        geo: newGeo.data.results[0],
        formattedAddress: `${unit || partnerDepot?.get("unit")}${streetAddress || partnerDepot?.get("streetAddress")}, ${city || partnerDepot?.get("city")}, ${postalCode || partnerDepot?.get("postalCode")}`,
      },
      {
        new: true,
      }
    );

    return res.status(200).send(doc);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send({ message: "Sorry, something went wrong" });
  }
};
