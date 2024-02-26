import mongoose, { Document, Schema } from "mongoose";
import { Partner } from "@repo/types";

const PartnerSchema = new Schema(
  {
    // Contact
    email: { type: Schema.Types.String, required: true },
    phone: { type: Schema.Types.String, required: true },
    wechat: { type: Schema.Types.String, required: false },

    // Info
    name: { type: Schema.Types.String, required: true },
    firstName: { type: Schema.Types.String, required: false },
    lastName: { type: Schema.Types.String, required: false },
    picture: { type: Schema.Types.String, required: false },
    depots: { type: [Schema.Types.ObjectId], ref: "Depot", required: true },
    locale: { type: Schema.Types.String, required: true },
    companyName: { type: Schema.Types.String, required: true },
    hstNumber: { type: Schema.Types.String, required: true },

    // Onboarding status
    isEmailVerified: { type: Schema.Types.Boolean, required: false },
    onboardingStatus: { type: Schema.Types.Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<Partner & Document>("Partner", PartnerSchema);
