import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export async function fetchParcel({
  token,
  parcelId,
}: {
  token?: string;
  parcelId: string;
}) {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/${parcelId}`,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
