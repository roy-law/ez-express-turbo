import mongoose, { Document, Schema } from "mongoose";
import { IAddress } from "../types/Address";
import { PackageSize, PackageStatus } from "../types/Parcel";
import { GeocodeResult } from "@googlemaps/google-maps-services-js";
import { WorkingShift } from "../types/DriverSchedule";

interface ITrackingTimeline {
  status: PackageStatus;
  createdAt: Date;
}

export interface IParcel extends IAddress {
  // Info
  depotId: string;
  name: string;
  firstName: string;
  lastName: string;
  packageSize: PackageSize; // Normal (50x50x50) vs Extra large
  status: PackageStatus;
  notes: string;
  price: number;

  // Contact
  phone: string;
  email: string;
  wechat: string;

  // Tracking
  trackingNumber: string;
  qrcode: string;
  barcode: string;
  trackingTimeline: ITrackingTimeline[];

  // Geo
  geo: GeocodeResult;

  // Delivery
  deliveryPerson: string;
  scheduledDeliveryDay: string;
  scheduledDeliveryShift: WorkingShift;
}

export interface IParcelModel extends IParcel, Document {}

const ParcelSchema = new Schema(
  {
    // Info
    depotId: { type: Schema.Types.ObjectId, required: true, ref: "Depot" },
    companyId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    packageSize: { type: String, required: true },
    status: { type: String, required: true },
    notes: { type: String, required: false },
    price: { type: Number, required: true },
    customerRef: { type: String, required: false },
    parcelsCount: { type: Number, required: true },

    // Contact
    phone: { type: String, required: true },
    email: { type: String, required: false },
    wechat: { type: String, required: false },

    // Tracking
    trackingNumber: { type: String, required: false },
    qrcode: { type: String, required: false },
    barcode: { type: String, required: false },
    trackingTimeline: [
      {
        status: { type: String, required: true },
        createdAt: { type: Date, required: true },
      },
    ],

    // Delivery
    deliveryPerson: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
      required: false,
    },
    scheduledDeliveryDay: { type: String, required: false },
    scheduledDeliveryShift: { type: String, required: false },

    // To Address
    country: { type: Object, required: true },
    province: { type: Object, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    streetAddress: { type: String, required: true },
    unit: { type: String, required: false },
    formattedAddress: { type: String, required: false },

    // To Address Geo
    geo: { type: Object, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IParcelModel>("Parcel", ParcelSchema);
