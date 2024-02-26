import mongoose, { Document, Schema } from "mongoose";
import { BusinessParcel } from "@repo/types";

const BusinessParcelSchema = new Schema(
  {
    // The dispatching center that is responsible for this order
    dispatchingCenter: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "DispatchingCenter",
    },

    // The partner that we are picking up from
    partner: { type: Schema.Types.ObjectId, required: true, ref: "Partner" },

    // The partner's depot that we are picking up from (one partner could have multiple depots)
    partnerDepot: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "PartnerDepot",
    },

    // Schedules for delivery, pickup, and return
    deliverySchedule: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "DeliverySchedule",
      },
    ],
    pickupSchedule: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "PickupSchedule",
      },
    ],
    returnSchedule: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "ReturnSchedule",
      },
    ],
    linkedQrcodes: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "AdhocQrcode",
      },
    ],

    // Customer
    name: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    packageSize: { type: String, required: true },
    status: { type: String, required: true },
    notes: { type: String, required: false },
    price: { type: Number, required: true },
    parcelsCount: { type: Number, required: true },
    value: { type: String, required: false },

    // Contact
    phone: { type: String, required: true },
    email: { type: String, required: false },
    wechat: { type: String, required: false },

    // Tracking
    customerRef: { type: String, required: false },
    trackingNumber: { type: String, required: true },
    qrcode: { type: String, required: true },
    barcode: { type: String, required: false },
    trackingTimeline: [
      {
        status: { type: String, required: true },
        from: { type: String, required: false },
        notes: { type: String, required: false },
        picture: { type: String, required: false },
        createdAt: { type: Date, required: true },
      },
    ],
    // The delivery time window
    scheduledDeliveryTimewindow: {
      type: {
        from: { type: Date, required: true },
        to: { type: Date, required: true },
      },
      required: false, // This is required for delivery orders
    },

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

export default mongoose.model<BusinessParcel & Document>(
  "BusinessParcel",
  BusinessParcelSchema
);
