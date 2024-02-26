import { NextFunction, Request, Response } from "express";
import { googleClient } from "../../library/GoogleApi";
import Logging from "../../library/Logging";
import PartnerDepot from "../../models/PartnerDepot";
import { Province, Country } from "@repo/types";

// For partner to create their own depot
export const createPartnerDepot = async (
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
    // province,
    // country,
    unit,
    postalCode,
  } = req.body;

  try {
    const geo = await googleClient.geocode({
      params: {
        key: process.env.GOOGLE_API_KEY || "",
        address: `${streetAddress} ${city} ${Province.Ontario.province} ${postalCode}`,
        region: "ca",
      },
    });

    // Check if geo is valid
    if (!geo.data.results.length) {
      return res
        .status(400)
        .send({ message: "Invalid address. (Unable to get Geo)" });
    }

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
        country: Country.Canada,
        province: Province.Ontario,
        city,
        streetAddress,
        unit,
        postalCode,
        geo: geo.data.results[0],
        formattedAddress: `${unit ? unit + " " : ""}${streetAddress}, ${city}, ${postalCode}`,
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
