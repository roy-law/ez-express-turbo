import { useQuery, useQueryClient } from "react-query";
import { useUserStore } from "../store/user/useUserStore";
import { fetchUser } from "../services/api/fetchUser";

export const useUserApi = () => {
  const queryClient = useQueryClient();
  const { token, setUserData } = useUserStore();

  useQuery(["user", token], () => fetchUser(token), {
    enabled: !!token,
    initialData: queryClient.getQueryData(["user", token]),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["user", token])?.dataUpdatedAt,
    onSuccess: (data) => {
      if (data) setUserData(data);
    },
  });
};
