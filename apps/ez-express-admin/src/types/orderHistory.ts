import { ParcelResponse } from "./parcel";

export interface OneDayOrderHistoryResponse {
  day: string;
  numberOfOrders: number;
  totalAmount: string;
  parcels: ParcelResponse[];
}
