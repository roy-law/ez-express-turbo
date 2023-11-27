import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export async function fetchDepot(token?: string) {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/depot`,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
