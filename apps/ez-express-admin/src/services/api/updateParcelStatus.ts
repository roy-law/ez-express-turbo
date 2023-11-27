import axios from "axios";
import { PackageStatus } from "../../types";
import { headersFactory } from "../../utils/api/headersFactory";

export async function updateParcelStatus({
  parcelId,
  status,
  token,
}: {
  parcelId: string;
  status: PackageStatus;
  token?: string;
}) {
  const response = await axios.patch(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/status/${parcelId}`,
    { status },
    {
      headers: headersFactory({ bearToken: token }),
    },
  );

  return response.data;
}
