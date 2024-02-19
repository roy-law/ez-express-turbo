import { Address } from "./Address";
import { Contact } from "./Contact";
import { Time } from "./Time";

export const BusinessOrderSize = {
  Standard: "Standard",
  Exceptional: "Exceptional",
  Custom: "Custom",
} as const;

export type BusinessOrderSize =
  (typeof BusinessOrderSize)[keyof typeof BusinessOrderSize];

export const BusinessOrderStatus = {
  Pending: "Pending",
  InTransit: "InTransit",
  Delivered: "Delivered",
  Returned: "Returned",
  Cancelled: "Cancelled",
} as const;

export type BusinessOrderStatus =
  (typeof BusinessOrderStatus)[keyof typeof BusinessOrderStatus];

export const BusinessOrderValue = {
  Below200: "Below200",
  Below500: "Below500",
  Below1000: "Below1000",
  Above1000: "Above1000",
} as const;

export type BusinessOrderValue =
  (typeof BusinessOrderValue)[keyof typeof BusinessOrderValue];

export type TrackingTimeline = {
  status: BusinessOrderStatus;
  from?: string; // EmployeeId
  photos?: string[];
  notes?: string;
  createdAt: Date;
};

export type BusinessOrder = Address &
  Contact &
  Time & {
    // References
    dispatchingCenter: string; // DispatchingCenterId
    partner: string; // PartnerId
    partnerDepot: string; // PartnerDepotId
    deliverySchedule?: string[]; // DeliveryScheduleId array
    pickupSChedule?: string[]; // PickupScheduleId array
    returnSchedule?: string[]; // ReturnScheduleId array
    customerRef?: string;

    // Customer
    name: string;
    firstName?: string;
    lastName?: string;
    packageSize: BusinessOrderSize;
    status: BusinessOrderStatus;
    notes?: string;
    price: number;
    parcelsCount: number;
    value?: BusinessOrderValue;

    // Tracking
    scheduledDeliveryDay?: string;
    scheduledDeliveryTimewindow?: string;
    trackingNumber: string;
    qrcode: string;
    barcode?: string;
    trackingTimeline: TrackingTimeline[];
  };
