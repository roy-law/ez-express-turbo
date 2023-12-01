import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export async function fetchAdminParcel({
  trackingNumber,
  token,
}: {
  trackingNumber: string;
  token?: string;
}) {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/a/${trackingNumber}`,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
