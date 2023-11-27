import { useQuery } from "react-query";
import { useUserContext } from "../../providers/UserContextProvider";
import { fetchCustomerDayParcels } from "../../services/api/fetchCustomerDayParcels";
import { QUERY_KEYS } from "../useQueryKeys";

export const useParcelsDayApiV2 = (day: string) => {
  const { depot, token } = useUserContext();

  const response = useQuery(
    [QUERY_KEYS.DASHBOARD_PARCELS, day, token?.token],
    () =>
      fetchCustomerDayParcels({
        token: token?.token,
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
