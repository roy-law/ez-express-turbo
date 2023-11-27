import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export async function fetchCustomerDayParcels({
  token,
  depotId,
  day,
}: {
  token?: string;
  depotId?: string;
  day?: string;
}) {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/cday`,
    {
      params: {
        depotId,
        day,
      },
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
