import axios from "axios";
import { User } from "../../types";
import { headersFactory } from "../../utils/api/headersFactory";

export async function createUser({ token, ...user }: User & { token: string }) {
  const response = await axios.post(
    `${import.meta.env["VITE_API_URL"]}/api/user`,
    user,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
