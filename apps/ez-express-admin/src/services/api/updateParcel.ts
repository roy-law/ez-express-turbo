import axios from "axios";
import { ParcelRequest as ParcelRequestTemp } from "../../types";
import { headersFactory } from "../../utils/api/headersFactory";

interface ParcelRequest extends Partial<ParcelRequestTemp> {
  _id: string;
}

export async function updateParcel({
  token,
  ...parcel
}: ParcelRequest & { token?: string }) {
  const response = await axios.put(
    `${import.meta.env["VITE_API_URL"]}/api/parcel`,
    parcel,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
