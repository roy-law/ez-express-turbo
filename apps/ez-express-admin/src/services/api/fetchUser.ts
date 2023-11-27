import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export const fetchUser = async (token?: string) => {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/user`,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
};
