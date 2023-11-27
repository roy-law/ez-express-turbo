import { useQuery } from "react-query";
import { useUserContext } from "../providers/UserContextProvider";
import { fetchAdminDayParcels } from "../services/api/fetchAdminDayParcels";
import { AreaConfigMap, AreaName } from "../types";

export const useAdminAreaParcel = (areaName: AreaName, day: string) => {
  const { token: accessToken } = useUserContext();
  const token = accessToken?.token;

  const response = useQuery({
    queryKey: AreaConfigMap[areaName].queryKey,
    queryFn: () =>
      fetchAdminDayParcels({
        day,
        postalCode: AreaConfigMap[areaName].postalCode,
        token,
      }),
    enabled: !!token && !!areaName,
  });

  return response;
};
