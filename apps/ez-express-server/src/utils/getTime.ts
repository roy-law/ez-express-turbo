import { sub } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

export const getStartEndofDayInUTC = (dayString: string, tz: string) => {
  const startOfDayUtc = zonedTimeToUtc(`${dayString} 00:00:00.001`, tz);
  const endOfDayUtc = zonedTimeToUtc(`${dayString} 23:59:59.999`, tz);

  return [startOfDayUtc, endOfDayUtc];
};

export const getStartEndOfDayInUTCWithOffset = (
  dayString: string,
  tz: string,
  offset: { hours: number; minutes: number }
) => {
  const [dayStart, dayEnd] = getStartEndofDayInUTC(dayString, tz);
  const [dayStartFromOffset, dayEndFromOffset] = [
    sub(dayStart, offset),
    sub(dayEnd, offset),
  ];

  return [dayStartFromOffset, dayEndFromOffset];
};
