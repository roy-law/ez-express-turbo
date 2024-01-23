import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../store/user/useUserStore";
import { checkIsEmailExist } from "../services/api/checkIsEmailExist";
import { useEffect } from "react";

export const useEmailExistApi = () => {
  const queryClient = useQueryClient();
  const { token, setIsEmailExist } = useUserStore();

  const { isSuccess, data } = useQuery({
    queryKey: ["email exists", token],
    queryFn: () => checkIsEmailExist(token),
    enabled: !!token,
    initialData: queryClient.getQueryData(["email exists", token]),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["email exists", token])?.dataUpdatedAt,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setIsEmailExist(data);
    }
  }, [data, isSuccess, setIsEmailExist]);
};
