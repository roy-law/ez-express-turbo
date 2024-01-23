import { useQuery } from "@tanstack/react-query";
import { fetchParcel } from "../../services/api";
import { useUserContext } from "../../providers/UserContextProvider";
import { QUERY_NAME, useQueryKeys } from "../useQueryKeys";

export const useParcelApi = ({ parcelId = "" }: { parcelId?: string }) => {
  const { token } = useUserContext();
  const { parcelQueryKeys } = useQueryKeys();

  const response = useQuery({
    queryKey: parcelQueryKeys(parcelId)[QUERY_NAME.PARCEL_DETAIL],
    queryFn: () => fetchParcel({ parcelId, token: token?.token }),
    select: (data) => data,
    enabled: !!parcelId && !!token?.token,
  });

  return response;
};
