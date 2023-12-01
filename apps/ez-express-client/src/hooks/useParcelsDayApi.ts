import { useQuery } from "react-query";
import { fetchCustomerDayParcels } from "../services/api/fetchCustomerDayParcels";
import { QUERY_KEYS } from "./useQueryKeys";
import { useUserStore } from "../store/user/useUserStore";

export const useParcelsDayApiV2 = (day: string) => {
  const { depotData: depot, token } = useUserStore();

  const response = useQuery(
    [QUERY_KEYS.DASHBOARD_PARCELS, day, token],
    () =>
      fetchCustomerDayParcels({
        token,
        depotId: depot?._id ?? "",
        day,
      }),
    {
      select: (data) =>
        data && data.length
          ? data.sort(
              (a: any, b: any) =>
                new Date(b.createdAt).valueOf() -
                new Date(a.createdAt).valueOf(),
            )
          : [],
      enabled: !!depot?._id && !!token && !!day,
    },
  );

  return response;
};
