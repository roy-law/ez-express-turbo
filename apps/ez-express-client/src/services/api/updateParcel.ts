import axios from "axios";
import { Parcel } from "../../types";
import { headersFactory } from "../../utils/api/headersFactory";

export async function updateParcel({
  token,
  ...parcel
}: Parcel & { token?: string }) {
  const response = await axios.put(
    `${import.meta.env["VITE_API_URL"]}/api/parcel`,
    parcel,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
