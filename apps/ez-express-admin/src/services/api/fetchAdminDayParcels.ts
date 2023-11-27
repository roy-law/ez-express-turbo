import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export async function fetchAdminDayParcels({
  day,
  postalCode,
  token,
}: {
  day: string;
  postalCode: string;
  token?: string;
}) {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/aday`,
    {
      params: {
        day,
        postalCode,
      },
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
