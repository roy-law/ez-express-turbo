import { format } from "date-fns";
import { useQueries, useQuery } from "react-query";
import { useUserContext } from "../providers/UserContextProvider";
import { fetchAdminDayParcels } from "../services/api/fetchAdminDayParcels";
import { AreaConfigMap, PackageStatus } from "../types";
import lodash from "lodash";

export const useAdminDashboard = () => {
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
      name: config.name,
      total: 0,
      totalDelivered: 0,
      totalAmount: 0,
      drivers: [],
      pacakges: [],
    },
    select: (data: any) => {
      const uniqueDrivers = lodash
        .uniqBy(data, (p: any) => p?.deliveryPerson?._id)
        .filter((p: any) => !!p?.deliveryPerson?.username)
        .map((p: any) => p?.deliveryPerson?.username);

      return {
        total: data.length || 0,
        totalDelivered: lodash.filter(
          data,
          (p) => p.status === PackageStatus.Delivered,
        ).length,
        totalAmount:
          data && data.length
            ? data.reduce((pre: any, curr: any) => pre + curr.price, 0)
            : 0,
        pacakges: data.length,
        drivers: uniqueDrivers,
        ...config,
      };
    },
  }));

  const data = useQueries(queries);
  return data;
};
