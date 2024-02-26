import mongoose, { Document, Schema } from "mongoose";
import { DispatchingCenter } from "@repo/types";

const DispatchingCenterSchema = new Schema(
  {
    manager: [
      { type: Schema.Types.ObjectId, ref: "Employee", required: false },
    ],

    // Contact
    phone: { type: String, required: true },
    email: { type: String, required: true },
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
  { timestamps: true, versionKey: false }
);

export default mongoose.model<DispatchingCenter & Document>(
  "DispatchingCenter",
  DispatchingCenterSchema
);
