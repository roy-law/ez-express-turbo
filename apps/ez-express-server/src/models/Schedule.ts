import mongoose, { Document, Schema, SchemaType } from "mongoose";
import { ServicingAreaName } from "../types/Area";
import { DriverScheduleType, WorkingShift } from "../types/DriverSchedule";

export interface ISchedule {
  parcelsOrder: string[];
  day: string; // 2023-03-21
  postalCode: string[]; // L1T,M1P,M15
  predefiniedArea: ServicingAreaName;
  assignedTo: string;
  type: DriverScheduleType;
  shift: WorkingShift;
}

const ScheduleSchema = new Schema(
  {
    day: { type: String, required: true },
    parcelsOrder: [
      { type: Schema.Types.ObjectId, required: true, ref: "Parcel" },
    ],
    postalCode: [{ type: String, required: true }],
    predefinedArea: { type: String, required: true },
    type: { type: String, required: true },
    shift: { type: String, required: false },
    assignedTo: { type: Schema.Types.ObjectId, ref: "Driver", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export interface IScheduleModel extends ISchedule, Document {}

export default mongoose.model<IScheduleModel>("Schedule", ScheduleSchema);
