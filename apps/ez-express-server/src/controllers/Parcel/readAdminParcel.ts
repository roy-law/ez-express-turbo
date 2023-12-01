import { Request, Response } from "express";
import Parcel from "../../models/Parcel";

export const readAdminParcel = (req: Request, res: Response) => {
  const trackingNumber = req.params.trackingNumber;

  return Parcel.find({ trackingNumber })
    .populate("depotId")
    .then((parcel) =>
      parcel ? res.status(200).send(parcel) : res.status(404).json("not found")
    )
    .catch((error) => res.status(500).json({ error }));
};
