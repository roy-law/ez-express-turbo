import mongoose, { Document, ObjectId, Schema } from "mongoose";

export enum UserStatus {
  OnboardEmail,
  OnboardCompany,
  OnboardDepot,
  Onboarded,
}
export interface User {
  firstName: string;
  lastName: string;
  name: string;
  picture: string;
  email: string;
  isEmailVerified: string;
  locale: string;
  status: UserStatus;
  companyName: string;
  hstNumber: string;
  isTermsChecked: boolean;
}

export interface IUserModel extends Document {}

const UserSchema = new Schema(
  {
    /** required fields*/
    status: { type: Schema.Types.Number, enum: UserStatus, required: true },
    email: { type: Schema.Types.String, required: true , unique: true},

    /** not required fields*/
    firstName: { type: Schema.Types.String, required: false },
    lastName: { type: Schema.Types.String, required: false },
    name: { type: Schema.Types.String, required: false },
    companyName: { type: Schema.Types.String, required: false },
    hstNumber: { type: Schema.Types.String, required: false },
    locale: { type: Schema.Types.String, required: false },
    isEmailVerified: { type: Schema.Types.Boolean, required: false },
    isTermsChecked: { type: Schema.Types.Boolean, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IUserModel>("User", UserSchema);
