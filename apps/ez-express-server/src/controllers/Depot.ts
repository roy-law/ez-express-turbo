import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Depot from "../models/Depot";
import { countries } from "country-data";
import { ProvinceOntario } from "@repo/types";
import User from "../models/User";
import { getAccessTokenArgs } from "../getAccessTokenArgs";
import { googleClient } from "../library/GoogleApi";
import Logging from "../library/Logging";

const createDepot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = getAccessTokenArgs(req.headers.authorization);
    const { phone, city, postalCode, streetAddress, unit, wechat } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("No access to create");
    }

    // check if db has depot with the same email
    const dbDepot = await Depot.findOne({ email });
    if (dbDepot) {
      return res.status(400).send("Duplicate depot");
    }

    // if not in dd, create it
    const depot = await Depot.create({
      _id: new mongoose.Types.ObjectId(),
      // Raw
      city,
      postalCode,
      streetAddress,
      unit, // Optional
      phone,
      email,
      wechat, // Optional

      // Generated
      formattedAddress: `${
        unit ? unit + " " : ""
      }${streetAddress}, ${city}, ${postalCode}`,
      country: countries["CA"],
      province: ProvinceOntario,
    });

    // Adding geo location
    const geo = await googleClient.geocode({
      params: {
        key: process.env.GOOGLE_API_KEY || "",
        address: `${depot.get("streetAddress")} ${depot.get("city")} ${
          depot.get("province").alpha
        } ${depot.get("postalCode")}`,
        region: "ca",
      },
    });

    // moved the user to next onboarding stage
    await User.findOneAndUpdate({ email, geo }, { status: 3 }, { new: true });

    return res.status(200).send(depot);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};

const readDepot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = getAccessTokenArgs(req.headers.authorization);

    const depot = await Depot.findOne({ email });

    if (depot) return res.status(200).send(depot);
    else return res.status(400).send("not found");
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};

const updateDepot = async (req: Request, res: Response, next: NextFunction) => {
  const { _id: depotId, ...data } = req.body;

  try {
    const depot = await Depot.findByIdAndUpdate(
      depotId,
      {
        ...data,
        country: countries["CA"],
        province: ProvinceOntario,
      },
      { new: true }
    );

    const geo = await googleClient.geocode({
      params: {
        key: process.env.GOOGLE_API_KEY || "",
        address: `${depot?.get("streetAddress")} ${depot?.get("city")} ${
          depot?.get("province").alpha
        } ${depot?.get("postalCode")}`,
        region: "ca",
      },
    });

    const doc = await Depot.findByIdAndUpdate(
      depotId,
      {
        formattedAddress: `${
          depot?.get("unit") ? depot.get("unit") + " " : ""
        }${depot?.get("streetAddress")}, ${depot?.get("city")}, ${depot?.get(
          "postalCode"
        )}`,
        geo: geo.data.results[0],
      },
      {
        new: true,
      }
    );

    if (doc) {
      return res.status(200).send(doc);
    } else {
      return res.status(400).send("not found");
    }
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};

//** Admin ONLY */
const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const depots = await Depot.find({});
    const depotsWithCompanyName = await Promise.all(
      depots.map(async (depot) => {
        const company = await User.findOne({ email: depot.get("email") });

        return {
          ...depot.toObject(),
          company,
        };
      })
    );

    if (depotsWithCompanyName) {
      return res.status(200).send(depotsWithCompanyName);
    } else {
      return res.status(400).send("not found");
    }
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};

export default { createDepot, readDepot, readAll, updateDepot };
