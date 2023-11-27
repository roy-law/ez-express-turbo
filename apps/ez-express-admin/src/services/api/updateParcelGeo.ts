import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

interface ParcelGeoRequest {
  parcelId: string;
}

export async function updateParcelGeo({
  token,
  parcelId,
}: ParcelGeoRequest & { token?: string }) {
  const response = await axios.patch(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/geo/${parcelId}`,
    {},
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
