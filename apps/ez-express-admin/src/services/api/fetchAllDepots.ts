import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export const fetchAllDepots = async ({ token }: { token?: string }) => {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/depot/all`,

    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
};
