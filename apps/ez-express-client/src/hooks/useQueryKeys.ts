import { useCallback, useMemo } from "react";
import { useUserContext } from "../providers/UserContextProvider";
import { add, format } from "date-fns";

export const QUERY_KEYS = {
  DASHBOARD_PARCELS: "dashboard parcels",
  PARCEL: "parcel",
};

export enum QUERY_NAME {
  DASHBOARD_TODAY_PARCELS = "DASHBOARD_TODAY_PARCELS",
  DASHBOARD_TMR_PARCELS = "DASHBOARD_TMR_PARCELS",
  PARCEL_DETAIL = "PARCEL_DETAIL",
}

export const useQueryKeys = () => {
  const { token } = useUserContext();

  const dashboardQueryKeys = useMemo(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    const tmr = format(add(new Date(), { days: 1 }), "yyyy-MM-dd");
    return {
      [QUERY_NAME.DASHBOARD_TODAY_PARCELS]: [
        QUERY_KEYS.DASHBOARD_PARCELS,
        today,
        token?.token,
      ],
      [QUERY_NAME.DASHBOARD_TMR_PARCELS]: [
        QUERY_KEYS.DASHBOARD_PARCELS,
        tmr,
        token?.token,
      ],
    };
  }, [token?.token]);

  const parcelQueryKeys = useCallback(
    (parcelId?: string) => ({
      [QUERY_NAME.PARCEL_DETAIL]: [QUERY_KEYS.PARCEL, parcelId, token?.token],
    }),
    [token?.token],
  );

  return { dashboardQueryKeys, parcelQueryKeys };
};
