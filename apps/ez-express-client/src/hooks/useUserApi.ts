import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../store/user/useUserStore";
import { fetchUser } from "../services/api/fetchUser";
import { useEffect } from "react";

export const useUserApi = () => {
  const queryClient = useQueryClient();
  const { token, setUserData } = useUserStore();

  const { data, isSuccess } = useQuery({
    queryKey: ["user", token],
    queryFn: () => fetchUser(token),
    enabled: !!token,
    initialData: queryClient.getQueryData(["user", token]),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["user", token])?.dataUpdatedAt,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUserData(data);
    }
  }, [data, isSuccess, setUserData]);
};
