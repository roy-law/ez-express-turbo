import { format } from "date-fns";
import { useQueries, useQuery } from "react-query";
import { useUserContext } from "../providers/UserContextProvider";
import { fetchAdminDayParcels } from "../services/api/fetchAdminDayParcels";
import { AreaConfigMap } from "../types";

export const useAdminParcels = () => {
  const { token: accessToken } = useUserContext();
  const token = accessToken?.token;
  const day = format(new Date(), "yyyy-MM-dd");

  const queries = [
    AreaConfigMap["scarborough"],
    AreaConfigMap["toronto"],
    AreaConfigMap["northyork"],
    AreaConfigMap["etobicoke"],
    AreaConfigMap["eastyork"],
    AreaConfigMap["markham"],
    AreaConfigMap["richmondhill"],
    AreaConfigMap["vaughan"],
    AreaConfigMap["newmarket"],
    AreaConfigMap["mississauga"],
    AreaConfigMap["ajax"],
    AreaConfigMap["pickering"],
    AreaConfigMap["stouffville"],
  ].map((config) => ({
    queryKey: [config.queryKey, config.postalCode, token],
    queryFn: () =>
      fetchAdminDayParcels({ day, postalCode: config.postalCode, token }),
    enabled: !!token,
    placeholderData: {
      areaName: config.areaName,
      packages: [],
      count: 0,
    },
    select: (data: any) => {
      return {
        name: config.name,
        areaName: config.areaName,
        pacakges: data,
        count: data.length,
      };
    },
    staleTime: Infinity,
  }));

  const data = useQueries(queries);
  return data;
};
