import mongoose, { Document, Schema } from "mongoose";
import { PartnerDepot } from "@repo/types";

const PartnerDepotSchema = new Schema(
  {
    // Contact
    phone: { type: String, required: true },
    email: { type: String, required: true },
    wechat: { type: String, required: false },

    // Orders
    orders: { type: [Schema.Types.ObjectId], ref: "Order", required: false },

    // Address
    country: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    streetAddress: { type: String, required: true },
    unit: { type: String, required: false },
    formattedAddress: { type: String, required: false },

    // Depot Address Geo
    geo: { type: Object, required: false },

    // Customer Contacts
    customerContacts: {
      type: [Schema.Types.ObjectId],
      ref: "CustomerContact",
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<Document & PartnerDepot>(
  "PartnerDepot",
  PartnerDepotSchema
);
