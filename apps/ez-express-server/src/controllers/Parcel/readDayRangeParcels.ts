import { NextFunction, Request, Response } from "express";

import Parcel from "../../models/Parcel";
import { getStartEndofDayInUTC } from "../../utils/getTime";

const tz = "America/Toronto";

export const readDayRangeParcels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const depotId = req.query.depotId;
  const from = req.query.from as string;
  const to = req.query.to as string;
  const [fromStartOfDayUtc, _] = getStartEndofDayInUTC(from, tz);
  const [__, toEndOfDayUtc] = getStartEndofDayInUTC(to, tz);

  try {
    const parcelUniqueDatesData = await Parcel.aggregate([
      {
        $match: {
          $expr: { $eq: ["$depotId", { $toObjectId: depotId }] },
          createdAt: {
            $gte: fromStartOfDayUtc,
            $lte: toEndOfDayUtc,
          },
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          _id: 0,
          dateString: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: tz,
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          distinctDate: { $addToSet: { dateString: "$dateString" } },
        },
      },
    ]);

    if (parcelUniqueDatesData.length === 0) {
      return res.status(200).send([]);
    }
    const parcelUniqueDates = parcelUniqueDatesData[0].distinctDate.map(
      (i: { dateString: string }) => i.dateString
    );
    const result = await Promise.all(
      parcelUniqueDates.map(async (date: string) => {
        const [dateStartInUtc, dateEndInUtc] = getStartEndofDayInUTC(date, tz);
        const parcels = await Parcel.aggregate([
          {
            $match: {
              $expr: { $eq: ["$depotId", { $toObjectId: depotId }] },
              createdAt: {
                $gte: dateStartInUtc,
                $lte: dateEndInUtc,
              },
            },
          },
        ]);

        const totalAmount = Number(
          parcels.reduce((pre, curr) => {
            return pre + curr.price * (curr.province.tax + 1);
          }, 0)
        ).toFixed(2);

        return {
          day: date,
          numberOfOrders: parcels.length,
          totalAmount,
          parcels,
        };
      })
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500);
  }
};
