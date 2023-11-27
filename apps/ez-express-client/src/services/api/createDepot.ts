import axios from "axios";
import { Depot } from "../../types";
import { headersFactory } from "../../utils/api/headersFactory";

export async function createDepot({
  token,
  ...data
}: Depot & { token?: string }) {
  const response = await axios.post(
    `${import.meta.env["VITE_API_URL"]}/api/depot`,
    data,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
