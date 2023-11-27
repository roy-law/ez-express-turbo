import axios from "axios";
import { Depot } from "../../types";
import { headersFactory } from "../../utils/api/headersFactory";

interface DepotRequest extends Depot {
  _id: string;
  token?: string;
}

export async function updateDepot({ token, ...data }: DepotRequest) {
  const response = await axios.put(
    `${import.meta.env["VITE_API_URL"]}/api/depot`,
    data,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
