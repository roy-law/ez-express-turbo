import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../store/user/useUserStore";
import { fetchDepot } from "../services/api/fetchDepot";
import { useEffect } from "react";

export const useDepotApi = () => {
  const queryClient = useQueryClient();
  const { token, userData, setDepotData } = useUserStore();

  const { data, isSuccess } = useQuery({
    queryKey: ["depot", token],
    queryFn: () => fetchDepot(token),
    enabled: !!token && !!userData?.email,
    initialData: queryClient.getQueryData(["depot", token]),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["depot", token])?.dataUpdatedAt,
  });

  useEffect(() => {
    if (data && isSuccess) {
      setDepotData(data);
    }
  }, [data, isSuccess, setDepotData]);
};
