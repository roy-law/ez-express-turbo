import { Request, Response } from "express";
import { countries } from "country-data";

import Parcel from "../../models/Parcel";
import { ProvinceOntario } from "../../types/Address";
import { googleClient } from "../../library/GoogleApi";
import Logging from "../../library/Logging";
import { optimoRouteClient } from "../../library/OptimoRouteApi";
import { transformParcelToOptimoRouteOrder } from "../../library/OptimoRouteApi/transformParcelToOptimoRouteOrder";
import Depot from "../../models/Depot";

export const updateParcelGeo = async (req: Request, res: Response) => {
  const parcelId = req.params.parcelId;

  try {
    const parcel = await Parcel.findByIdAndUpdate(
      parcelId,
      {
        // Generated country & province
        province: ProvinceOntario,
        country: countries["CA"],
      },
      { new: true }
    );

    const depot = await Depot.findById(parcel?.depotId)

    const geo = await googleClient.geocode({
      params: {
        key: process.env.GOOGLE_API_KEY || "",
        address: `${parcel?.get("streetAddress")} ${parcel?.get(
          "city"
        )} ${parcel?.get("province").alpha} ${parcel?.get("postalCode")}`,
        region: "ca",
      },
    });

    Logging.log({
      address: `${parcel?.get("streetAddress")} ${parcel?.get(
        "city"
      )} ${parcel?.get("province").alpha} ${parcel?.get("postalCode")}`,
    });

    const doc = await Parcel.findByIdAndUpdate(
      parcelId,
      {
        geo: geo.data.results[0],
      },
      {
        new: true,
      }
    );

    if (doc) {
      const shouldTurnOnOptimoroute = process.env.NODE_ENV === "development";

      if (shouldTurnOnOptimoroute) {
      // update order address on Optimoroute
        await optimoRouteClient.syncOrder(
          transformParcelToOptimoRouteOrder(doc, depot)
        );
      }
      return res.status(200).send(doc);
    } else {
      return res.status(400).send("not found");
    }
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
