import { useQuery } from "react-query";
import axios from "axios";

export async function fetchParcel(parcelId: string) {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/${parcelId}`,
  );

  return response.data;
}

export const useParcelApi = ({ parcelId = "" }: { parcelId?: string }) => {
  const response = useQuery(["parcel", parcelId], () => fetchParcel(parcelId), {
    select: (data) => data,
    enabled: !!parcelId,
  });

  return response;
};
