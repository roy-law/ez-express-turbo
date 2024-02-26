import mongoose, { Document, Schema } from "mongoose";
import { GeocodeResult } from "@googlemaps/google-maps-services-js";
import { IAddress } from "@repo/types";

export interface IDepot extends IAddress {
  // Contact
  phone: string;
  wechat: string;
  email: string;

  // Info
  name: string;

  // Geo
  geo: GeocodeResult;
}

export interface IDepotModel extends IDepot, Document {}

const DepotSchema = new Schema(
  {
    // Contact
    phone: { type: String, required: true },
    email: { type: String, required: true },
    wechat: { type: String, required: false },

    // Address
    country: { type: Object, required: true },
    province: { type: Object, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    streetAddress: { type: String, required: true },
    unit: { type: String, required: false },
    formattedAddress: { type: String, required: false },

    // Depot Address Geo
    geo: { type: Object, required: false },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<IDepotModel>("Depot", DepotSchema);
