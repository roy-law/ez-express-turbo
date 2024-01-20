import { Request, Response } from "express";
import Logging from "../../library/Logging";
import AreaPostalCode from "../../models/AreaPostalCode";

export const getAreaPostalCode = async (req: Request, res: Response) => {
  const { areaName } = req.body;

  try {
    if (!areaName) {
      const areaPostalCode = await AreaPostalCode.find();
      return res.status(200).send(areaPostalCode);
    } else {
      const areaPostalCode = await AreaPostalCode.findOne({
        areaName,
      });
      return res.status(200).send(areaPostalCode);
    }
  } catch (error) {
    Logging.error(error);
    return res.status(500).send();
  }
};
