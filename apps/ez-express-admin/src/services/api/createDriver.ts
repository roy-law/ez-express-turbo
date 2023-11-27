import axios from "axios";
import { Driver } from "../../types";
import { headersFactory } from "../../utils/api/headersFactory";

export async function createDriver({
  token,
  ...data
}: Driver & { token?: string }) {
  const response = await axios.post(
    `${import.meta.env["VITE_API_URL"]}/api/driver`,
    data,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
