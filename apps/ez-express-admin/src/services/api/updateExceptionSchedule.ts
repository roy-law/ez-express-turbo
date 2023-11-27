import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export async function updateExceptionSchedule({
  token,
  exceptionScheduleId,
  parcels,
  parcelsTracking,
}: {
  token?: string;
  exceptionScheduleId: string;
  parcels?: string[];
  parcelsTracking?: string[];
}) {
  const response = await axios.put(
    `${import.meta.env["VITE_API_URL"]}/api/exceptionSchedule`,
    { exceptionScheduleId, parcels, parcelsTracking },
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
