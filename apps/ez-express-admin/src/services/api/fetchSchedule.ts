import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";
import { AreaName, DriverScheduleType, WorkingShift } from "../../types";

export async function fetchSchedule({
  token,
  day,
  predefinedArea,
  type,
  shift,
}: {
  token?: string;
  day: string;
  predefinedArea: AreaName;
  type: DriverScheduleType;
  shift?: WorkingShift;
}) {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/schedule`,
    {
      params: {
        day,
        predefinedArea,
        type,
        shift,
      },
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
