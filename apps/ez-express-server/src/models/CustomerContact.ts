import mongoose, { Document, Schema } from "mongoose";
import { CustomerContact } from "@repo/types";

const CustomerContactSchema = new Schema(
  {
    // Customer Info
    name: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    depot: { type: Schema.Types.ObjectId, ref: "Depot", required: true },
    notes: [{ type: String, required: false }],

    // Contact
    phone: { type: String, required: true },
    email: { type: String, required: false },
    wechat: { type: String, required: false },

    // Address
    country: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    streetAddress: { type: String, required: true },
    unit: { type: String, required: false },
    formattedAddress: { type: String, required: false },
    geo: { type: Object, required: false },
  },
  { timestamps: true, versionKey: true }
);

export default mongoose.model<CustomerContact & Document>(
  "CustomerContact",
  CustomerContactSchema
);
