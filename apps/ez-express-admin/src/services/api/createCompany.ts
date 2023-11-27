import axios from "axios";
import { Company } from "../../types";
import { headersFactory } from "../../utils/api/headersFactory";

export async function createCompany({
  token,
  ...data
}: Company & { token?: string }) {
  const response = await axios.put(
    `${import.meta.env["VITE_API_URL"]}/api/user`,
    { ...data, status: 2 },
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
