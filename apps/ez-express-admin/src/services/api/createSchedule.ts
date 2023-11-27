import axios from "axios";
import { Schedule } from "../../types";
import { headersFactory } from "../../utils/api/headersFactory";

export async function createSchedule({
  token,
  ...data
}: Schedule & { token?: string }) {
  const response = await axios.post(
    `${import.meta.env["VITE_API_URL"]}/api/schedule`,
    data,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
