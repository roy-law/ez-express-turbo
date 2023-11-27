import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface Driver {
  username: string;
  email: string;
  phone: string;
  picture: string;
}

export interface IDriverModel extends Document {}

const DriverSchema = new Schema(
  {
    username: { type: Schema.Types.String, required: true, unique: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    phone: { type: Schema.Types.String, required: true, unique: true },
    picture: { type: Schema.Types.String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IDriverModel>("Driver", DriverSchema);
