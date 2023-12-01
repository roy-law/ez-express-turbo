import { format } from "date-fns";
import { useQueries } from "react-query";
import { useUserContext } from "../providers/UserContextProvider";
import { fetchAdminDayParcels } from "../services/api/fetchAdminDayParcels";
import { AreaConfigMap, PackageStatus } from "../types";

export const useOptimoCsv = () => {
  const { token: accessToken } = useUserContext();
  const token = accessToken?.token;
  const day = format(new Date(), "yyyy-MM-dd");

  const queries = [
    AreaConfigMap["scarborough"],
    AreaConfigMap["toronto"],
    AreaConfigMap["northyork"],
    AreaConfigMap["etobicoke"],
    AreaConfigMap["eastyork"],
    AreaConfigMap["markham"],
    AreaConfigMap["richmondhill"],
    AreaConfigMap["vaughan"],
    AreaConfigMap["newmarket"],
    AreaConfigMap["mississauga"],
    AreaConfigMap["ajax"],
    AreaConfigMap["pickering"],
    AreaConfigMap["stouffville"],
  ].map((config) => ({
    queryKey: [config.queryKey, config.postalCode, token],
    queryFn: () =>
      fetchAdminDayParcels({ day, postalCode: config.postalCode, token }),
    enabled: !!token,
    placeholderData: {
      pacakges: [],
    },
    select: (data: any) => {
      if (data && data.length)
        return {
          packages: data.map((i: any) => ({
            orderId: i.trackingNumber,
            date: format(new Date(), "yyyy-MM-dd"),
            shopName: i.companyId.companyName,
            address: i.formattedAddress,
            duration: "15",
            twFrom: "18:30",
            twTo: "23:59",
            notes: i.notes,
            email: "ezexpress.canada@gmail.com",
            phone: i.phone,
            notification: "text",
            parcelsCount: i.parcelsCount,
            area: i.city,
            status: i.status,
          })),
          ...config,
        };
    },
  }));

  const queriesData = useQueries(queries);

  const headers = [
    { label: "Order ID", key: "orderId" },
    { label: "Date", key: "date" },
    { label: "Shop Name", key: "shopName" },
    { label: "Address", key: "address" },
    { label: "Duration", key: "duration" },
    { label: "TW from", key: "twFrom" },
    { label: "TW to", key: "twTo" },
    { label: "Notes", key: "notes" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Notifications", key: "notification" },
    { label: "Parcels Count", key: "parcelsCount" },
    { label: "Area", key: "area" },
  ];

  const data = queriesData
    .reduce((prev: any, curr: any) => {
      if (curr.isSuccess && curr.data) {
        return [...prev, ...curr.data.packages];
      }
      return prev;
    }, [])

  const filteredData = data.filter((d: any) => d === PackageStatus.Cancelled || d === PackageStatus.Rejected)

  return { headers, data: filteredData };
};
