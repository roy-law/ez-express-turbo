import { Request, Response } from "express";
import Logging from "../../library/Logging";
import AreaPostalCode from "../../models/AreaPostalCode";

export const updateAreaPostalCode = async (req: Request, res: Response) => {
  const { postalCode, areaName } = req.body;

  try {
    const areaPostalCode = await AreaPostalCode.findOneAndUpdate(
      {
        areaName,
      },
      {
        $push: {
          postalCodes: postalCode,
        },
      },
      { new: true }
    );

    return res.status(200).send(areaPostalCode);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send();
  }
};
