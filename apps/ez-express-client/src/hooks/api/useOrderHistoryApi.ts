import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useUserContext } from "../../providers/UserContextProvider";
import { fetchOrderHistory } from "../../services/api";

export const useOrderHistoryApi = ({
  from,
  to,
}: {
  from: string;
  to: string;
}) => {
  const { depot, token } = useUserContext();

  const queryClient = useQueryClient();
  const response = useQuery({
    queryKey: ["order-history", from, to, depot?._id, token?.token],
    queryFn: () =>
      fetchOrderHistory({
        depotId: depot?._id ?? "",
        from,
        to,
        token: token?.token,
      }),
    select: (data) =>
      data && data.length
        ? data.sort(
            (a: any, b: any) =>
              new Date(b.day).valueOf() - new Date(a.day).valueOf(),
          )
        : [],
    enabled: !!depot?._id && !!from && !!to && !!token?.token,
    initialData: queryClient.getQueryData([
      "order-history",
      from,
      to,
      depot?._id,
      token?.token,
    ]),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState([
        "order-history",
        from,
        to,
        depot?._id,
        token?.token,
      ])?.dataUpdatedAt,
  });

  return response;
};
