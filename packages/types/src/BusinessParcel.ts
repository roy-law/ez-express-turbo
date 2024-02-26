import { Address } from "./Address";
import { Contact } from "./Contact";
import { Time } from "./Time";

export const BusinessParcelSize = {
  Standard: "Standard",
  Exceptional: "Exceptional",
  Custom: "Custom",
} as const;

export type BusinessParcelSize =
  (typeof BusinessParcelSize)[keyof typeof BusinessParcelSize];

export const BusinessParcelStatus = {
  Submitted: "Submitted",
  OnTheWayToPickup: "OnTheWayToPickup",
  PickedUp: "PickedUp",
  OnTheWayToDispatchingCenter: "OnTheWayToDispatchingCenter",
  ReceivedInDispatchingCenter: "ReceivedInDispatchingCenter",
  OnTheWayToDelivery: "OnTheWayToDelivery",
  FailedToDeliver: "FailedToDeliver",
  FailedToPickup: "FailedToPickup",
  OnTheWayToReturn: "OnTheWayToReturn",
  Returned: "Returned",
  Rejected: "Rejected",
  Cancelled: "Cancelled",
  Delivered: "Delivered",
} as const;

export type BusinessParcelStatus =
  (typeof BusinessParcelStatus)[keyof typeof BusinessParcelStatus];

export const BusinessParcelValue = {
  Below200: "Below200",
  Below500: "Below500",
  Below1000: "Below1000",
  Above1000: "Above1000",
} as const;

export type BusinessParcelValue =
  (typeof BusinessParcelValue)[keyof typeof BusinessParcelValue];

export type TrackingTimeline = {
  status: BusinessParcelStatus;
  from?: string; // EmployeeId
  photos?: string[];
  notes?: string;
  createdAt: Date;
};

export type BusinessParcel = Address &
  Contact &
  Time & {
    // References
    dispatchingCenter: string; // DispatchingCenter Object Id
    partner: string; // Partner Object Id
    partnerDepot: string; // PartnerDepot Object Id
    deliverySchedule?: string[]; // DeliverySchedule Object Id array
    pickupSchedule?: string[]; // PickupSchedule Object Id array
    returnSchedule?: string[]; // ReturnSchedule Object Id array
    linkedQrcodes?: string[]; // Linked Qrcodes Object Id

    // Customer
    name: string;
    firstName?: string;
    lastName?: string;
    notes?: string;

    // Tracking
    customerRef?: string;
    price: number;
    parcelsCount: number;
    value?: BusinessParcelValue;
    packageSize: BusinessParcelSize;
    status: BusinessParcelStatus;
    scheduledDeliveryTimewindow?: {
      from: Date;
      to: Date;
    };
    trackingNumber: string;
    qrcode: string;
    barcode?: string;
    trackingTimeline: TrackingTimeline[];
  };
