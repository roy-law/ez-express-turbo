import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export async function updateUser({
  token,
  ...data
}: {
  token?: string;
  status?: 0 | 1 | 2 | 3;
  firstName?: string;
  lastName?: string;
  name?: string;
  picture?: string;
  hstNumber?: string;
  companyName?: string;
  isTermsChecked?: boolean;
}) {
  const response = await axios.put(
    `${import.meta.env["VITE_API_URL"]}/api/user`,
    data,
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
