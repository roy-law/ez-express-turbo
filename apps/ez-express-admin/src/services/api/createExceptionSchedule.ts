import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export async function createExceptionSchedule({
  token,
  day,
  parcels,
  parcelsTracking,
}: {
  token?: string;
  day: string;
  parcels?: string[];
  parcelsTracking?: string[];
}) {
  const response = await axios.post(
    `${import.meta.env["VITE_API_URL"]}/api/exceptionSchedule`,
    { day, parcels, parcelsTracking },
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
