import { NextFunction, Request, Response } from "express";
import BusinessParcel from "../../models/BusinessParcel";
import Logging from "../../library/Logging";

// For admin to read parcels
export const readBusinessParcelsFromAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const depotIds = req.query.depotIds;
    const scheduledDeliveryTimeWindowFrom =
      req.query.scheduledDeliveryTimeWindowFrom;
    const scheduledDeliveryTimeWindowTo =
      req.query.scheduledDeliveryTimeWindowTo;

    const parcels = await BusinessParcel.find({
      depotId: { $in: depotIds },
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
