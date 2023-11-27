import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export const fetchAllDrivers = async ({ token }: { token?: string }) => {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/driver/all`,

    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
};
