import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export async function fetchTodayParcels({
  token,
  depotId,
}: {
  token?: string;
  depotId?: string;
}) {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/today`,
    {
      params: {
        id: depotId,
      },
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
