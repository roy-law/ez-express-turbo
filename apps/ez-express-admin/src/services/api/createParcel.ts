import axios from "axios";
import { ParcelRequest } from "../../types";
import { headersFactory } from "../../utils/api/headersFactory";

export async function createParcel({
  token,
  ...parcel
}: ParcelRequest & { price: number; token?: string }) {
  const response = await axios.post(
    `${import.meta.env["VITE_API_URL"]}/api/parcel`,
    parcel,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}

export async function createParcelV2({
  token,
  ...parcel
}: ParcelRequest & { price: number; token?: string }) {
  const response = await axios.post(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/v2`,
    parcel,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
