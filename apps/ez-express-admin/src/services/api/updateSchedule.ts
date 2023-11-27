import axios from "axios";
import { headersFactory } from "../../utils/api/headersFactory";

export async function updateSchedule({
  token,
  parcelsOrder,
  assignedTo,
  _id,
}: {
  token?: string;
  assignedTo: string;
  _id: string;
  parcelsOrder: string[];
}) {
  const response = await axios.put(
    `${import.meta.env["VITE_API_URL"]}/api/schedule`,
    { _id, parcelsOrder, assignedTo },
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
