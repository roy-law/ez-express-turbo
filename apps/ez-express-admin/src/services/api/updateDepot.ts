import axios from "axios";
import { Depot } from "../../types";

interface DepotRequest extends Depot {
  _id: string;
}

export async function updateDepot(depot: DepotRequest) {
  const response = await axios.put(
    `${import.meta.env["VITE_API_URL"]}/api/depot`,
    depot,
  );

  return response.data;
}
