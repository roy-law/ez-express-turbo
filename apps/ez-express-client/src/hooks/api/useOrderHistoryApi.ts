import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchOrderHistory } from "../../services/api";
import { useAccessToken } from "../../store/auth/useAuthStore";
import { useDepot } from "../../store/depot/useDepotStore";

export const useOrderHistoryApi = ({
  from,
  to,
}: {
  from: string;
  to: string;
}) => {
  const token = useAccessToken();
  const depot = useDepot();

  const queryClient = useQueryClient();
  const response = useQuery({
    queryKey: ["order-history", from, to, depot?._id, token],
    queryFn: () =>
      fetchOrderHistory({
        depotId: depot?._id ?? "",
        from,
        to,
        token: token,
      }),
    select: (data) =>
      data && data.length
        ? data.sort(
            (a: any, b: any) =>
              new Date(b.day).valueOf() - new Date(a.day).valueOf(),
          )
        : [],
    enabled: !!depot?._id && !!from && !!to && !!token,
    initialData: queryClient.getQueryData([
      "order-history",
      from,
      to,
      depot?._id,
      token,
    ]),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["order-history", from, to, depot?._id, token])
        ?.dataUpdatedAt,
  });

  return response;
};
