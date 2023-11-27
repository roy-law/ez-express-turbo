import axios from "axios";
import { OneDayOrderHistoryResponse } from "../../types";
import { headersFactory } from "../../utils/api/headersFactory";

export async function fetchOrderHistory({
  depotId,
  from,
  to,
  token,
}: {
  depotId: string;
  from: string;
  to: string;
  token?: string;
}) {
  const response = await axios.get<OneDayOrderHistoryResponse[]>(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/dayRange`,
    {
      params: {
        depotId,
        from,
        to,
      },
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
