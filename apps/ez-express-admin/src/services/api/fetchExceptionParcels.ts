import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export async function fetchExceptionParcels({ token, day }: { token?: string , day: string}) {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/exception`,
    {
      params: {
        day
      },
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
