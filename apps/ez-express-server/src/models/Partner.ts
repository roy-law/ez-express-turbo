import mongoose, { Document, Schema } from "mongoose";
import { Partner } from "../types/Partner";

const PartnerSchema = new Schema(
  {
    email: { type: Schema.Types.String, required: true },
    depots: { type: [Schema.Types.ObjectId], ref: "Depot", required: true },
    locale: { type: Schema.Types.String, required: true },
    partnerName: { type: Schema.Types.String, required: true },
    hstNumber: { type: Schema.Types.String, required: true },
    isEmailVerified: { type: Schema.Types.Boolean, required: false },
    onboardingStatus: { type: Schema.Types.Number, required: true },
  },
  {
    timestamps: true,
    versionKey: true,
  }
);

export default mongoose.model<Partner & Document>("Partner", PartnerSchema);
