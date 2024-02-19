import mongoose, { Document, Schema } from "mongoose";
import { Schedule } from "../types/Schedule";

const DeliveryScheduleSchema = new Schema(
  {
    dispatchingCenter: {
      type: Schema.Types.ObjectId,
      ref: "DispatchingCenter",
      required: true,
    },
    day: { type: String, required: true },
    timeWindow: { type: String, required: false },
    routeName: { type: String, required: true },
    routeColor: { type: String, required: true },
    assignedDriver: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    assignedVehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: false,
    },
    orders: { type: [Schema.Types.ObjectId], ref: "Order", required: false },
    startedTime: { type: Date, required: false },
    endedTime: { type: Date, required: false },
  },
  {
    timestamps: true,
    versionKey: true,
  }
);

export default mongoose.model<Document & Schedule>(
  "DeliverySchedule",
  DeliveryScheduleSchema
);
