import { NextFunction, Request, Response } from "express";
import Logging from "../../library/Logging";
import { getAccessTokenArgs } from "../../getAccessTokenArgs";
import Depot from "../../models/Depot";
import BusinessParcel from "../../models/BusinessParcel";

// For partner to read parcels
export const readBusinessParcelsFromDepot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const depotId = req.query.depotId;

    // Check if partner is authorized to read parcels
    const { email } = getAccessTokenArgs(req.headers.authorization);
    const partner = await Depot.findOne({ email });

    if (!(partner?.get("_id") === depotId)) {
      return res.status(401).send("Unauthorized to read parcels");
    }

    const scheduledDeliveryTimeWindowFrom =
      req.query.scheduledDeliveryTimeWindowFrom;
    const scheduledDeliveryTimeWindowTo =
      req.query.scheduledDeliveryTimeWindowTo;

    const parcels = await BusinessParcel.find({
      depotId,
      scheduledDeliveryDay: {
        from: { $gte: scheduledDeliveryTimeWindowFrom },
        to: { $lte: scheduledDeliveryTimeWindowTo },
      },
    });

    return res.status(200).send(parcels);
  } catch (error) {
    Logging.error(error);

    return res.status(500).send("Sorry, something went wrong");
  }
};
