import { useQuery } from "@tanstack/react-query";
import { fetchParcel } from "../../services/api";
import { QUERY_NAME, useQueryKeys } from "../useQueryKeys";
import { useAccessToken } from "../../store/auth/useAuthStore";

export const useParcelApi = ({ parcelId = "" }: { parcelId?: string }) => {
  const token = useAccessToken();
  const { parcelQueryKeys } = useQueryKeys();

  const response = useQuery({
    queryKey: parcelQueryKeys(parcelId)[QUERY_NAME.PARCEL_DETAIL],
    queryFn: () => fetchParcel({ parcelId, token: token }),
    select: (data) => data,
    enabled: !!parcelId && !!token,
  });

  return response;
};
