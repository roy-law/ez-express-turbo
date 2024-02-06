import { format } from "date-fns";
import { useUserContext } from "../providers/UserContextProvider";
import { useQuery } from "react-query";
import { fetchAdminTodayParcels } from "../services/api";

export const useAdminTodayParcels = () => {
  const { token } = useUserContext();
  const day = format(new Date(), "yyyy-MM-dd");

  return useQuery(
    [`all parcels`, day, token?.token],
    () =>
      fetchAdminTodayParcels({
        day,
        token: token?.token,
      }),
    {
      enabled: !!token?.token,
    },
  );
};
