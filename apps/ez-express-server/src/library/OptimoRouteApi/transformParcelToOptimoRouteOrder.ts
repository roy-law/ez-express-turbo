import { formatInTimeZone } from "date-fns-tz";
import { IParcelModel } from "../../models/Parcel";
import { getStartEndOfDayInUTCWithOffset } from "../../utils/getTime";
import { addDays } from "date-fns";
import { getCityByPostalCode } from "@repo/utils";
import { IDepotModel } from "../../models/Depot";
import { NotificationPreference, OptimoRouteOrder, OrderPriority, OrderType } from "./types";

export const transformParcelToOptimoRouteOrder = (
  parcel: IParcelModel,
  depot: IDepotModel | null
): Omit<OptimoRouteOrder, "operation"> => {
  const tz = "America/Toronto";
  const day = formatInTimeZone(new Date(), tz, "yyyy-MM-dd");
  const [dayStartFromYesterday6PM, dayEndFromToday6PM] =
    getStartEndOfDayInUTCWithOffset(day, tz, { hours: 5, minutes: 29 });
  const isTodayParcel =
    parcel.get("createdAt") > dayStartFromYesterday6PM &&
    parcel.get("createdAt") < dayEndFromToday6PM;
  const deliveryDate = isTodayParcel
    ? day
    : formatInTimeZone(addDays(new Date(day), 1), tz, "yyyy-MM-dd");

  const order = {
    orderNo: parcel.trackingNumber,
    date: deliveryDate,
    duration: 15,
    priority: OrderPriority.M,
    type: OrderType.D,
    assignedTo: {
      serial: "001",
    },
    location: {
      address: parcel.get("formattedAddress"),
      locationName: depot?.get("name"),
      acceptPartialMatch: true,
    },
    timeWindows: [
      {
        twFrom: "18:30",
        twTo: "23:59",
      },
    ],
    notes: parcel.notes,
    email: "ezexpress.canada@gmail.com",
    phone: parcel.phone,
    customField1: `${parcel.get("parcelsCount")}`, // parcels count
    customField2: `${getCityByPostalCode(parcel.postalCode)}`, // area name
    notificationPreference: NotificationPreference.Both,
  };

  return order;
};
