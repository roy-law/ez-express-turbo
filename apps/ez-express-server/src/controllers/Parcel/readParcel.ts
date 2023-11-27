import { NextFunction, Request, Response } from "express";
import Parcel from "../../models/Parcel";

export const readParcel = (req: Request, res: Response, next: NextFunction) => {
  const parcelId = req.params.parcelId;

  return Parcel.findById(parcelId)
    .populate("depotId")
    .then((parcel) =>
      parcel ? res.status(200).send(parcel) : res.status(404).json("not found")
    )
    .catch((error) => res.status(500).json({ error }));
};
