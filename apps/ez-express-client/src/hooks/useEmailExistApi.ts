import { useQuery, useQueryClient } from "@tanstack/react-query";
import { checkIsEmailExist } from "../services/api/checkIsEmailExist";
import { useEffect } from "react";
import { useAccessToken, useAuthActions } from "../store/auth/useAuthStore";

export const useEmailExistApi = () => {
  const queryClient = useQueryClient();
  const token = useAccessToken();
  const { setIsEmailExist } = useAuthActions();

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
