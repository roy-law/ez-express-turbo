import axios from "axios";
import { ParcelRequest } from "../../types";
import { headersFactory } from "../../utils/api/headersFactory";

type ParcelsRequest = {
  parcels: ParcelRequest & { depotId: string; price: number }[];
  token: string;
};

export async function createParcels({ parcels, token }: ParcelsRequest) {
  const response = await axios.post(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/parcels`,
    parcels,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
