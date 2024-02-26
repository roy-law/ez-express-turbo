import mongoose, { Document, Schema } from "mongoose";
import { BusinessOrder } from "@repo/types";

const BusinessOrderSchema = new Schema(
  {
    // References
    dispatchingCenter: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "DispatchingCenter",
    },
    partner: { type: Schema.Types.ObjectId, required: true, ref: "Partner" },
    partnerDepot: { type: Schema.Types.ObjectId, required: true, ref: "Depot" },
    scheduledDeliveryDay: { type: String, required: false },
    scheduledDeliveryTimewindow: { type: String, required: false },
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

export default mongoose.model<BusinessOrder & Document>(
  "Order",
  BusinessOrderSchema
);
