import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../store/user/useUserStore";
import { fetchDepot } from "../services/api/fetchDepot";
import { useEffect } from "react";
import { useDepotActions } from "../store/depot/useDepotStore";
import { useAccessToken } from "../store/auth/useAuthStore";

export const useDepotApi = () => {
  const queryClient = useQueryClient();
  const token = useAccessToken();
  const userData = useUser();
  const { setDepotData } = useDepotActions();

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
