import { useQuery } from "@tanstack/react-query";
import { fetchCustomerDayParcels } from "../../services/api/fetchCustomerDayParcels";
import { QUERY_KEYS } from "../useQueryKeys";
import { useAccessToken } from "../../store/auth/useAuthStore";
import { useDepot } from "../../store/depot/useDepotStore";

export const useParcelsDayApiV2 = (day: string) => {
  const token = useAccessToken();
  const depot = useDepot();

  const response = useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_PARCELS, day, token],
    queryFn: () =>
      fetchCustomerDayParcels({
        token,
        depotId: depot?._id ?? "",
        day,
      }),
    select: (data) =>
      data && data.length
        ? data.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
          )
        : [],
    enabled: !!depot?._id && !!token && !!day,
  });

  return response;
};
