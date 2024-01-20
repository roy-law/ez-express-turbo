import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the AreaPostalCode document
interface IAreaPostalCode extends Document {
  country: string;
  province: string;
  city: string;
  code: string;
  price: number;
  postalCode: string[];
}

// Define the Mongoose schema for the AreaPostalCode document
const AreaPostalCodeSchema: Schema = new Schema(
  {
    country: { type: String, required: true, default: "Canada" },
    province: { type: String, required: true, default: "Ontario" },
    city: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    postalCode: { type: [String], required: true },
  },
  { timestamps: true, versionKey: false }
);

// Create and export the AreaPostalCode model
export default mongoose.model<IAreaPostalCode>(
  "AreaPostalCode",
  AreaPostalCodeSchema
);
