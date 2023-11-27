import { useQuery, useQueryClient } from "react-query";
import { useUserStore } from "../store/user/useUserStore";
import { checkIsEmailExist } from "../services/api/checkIsEmailExist";

export const useEmailExistApi = () => {
  const queryClient = useQueryClient();
  const { token, setIsEmailExist } = useUserStore();

  useQuery(["email exists", token], () => checkIsEmailExist(token), {
    enabled: !!token,
    initialData: queryClient.getQueryData(["email exists", token]),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["email exists", token])?.dataUpdatedAt,
    onSuccess: (data) => setIsEmailExist(data),
  });
};
