import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export async function checkIsEmailExist(token?: string) {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/user/isEmailExist`,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
