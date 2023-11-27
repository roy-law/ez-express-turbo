import { useQuery, useQueryClient } from "react-query";
import { useUserStore } from "../store/user/useUserStore";
import { fetchDepot } from "../services/api/fetchDepot";

export const useDepotApi = () => {
  const queryClient = useQueryClient();
  const { token, userData, setDepotData } = useUserStore();

  useQuery(["depot", token], () => fetchDepot(token), {
    enabled: !!token && !!userData?.email,
    initialData: queryClient.getQueryData(["depot", token]),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["depot", token])?.dataUpdatedAt,
    onSuccess: (data) => setDepotData(data),
  });
};
