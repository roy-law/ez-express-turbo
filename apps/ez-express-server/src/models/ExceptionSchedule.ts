import mongoose, { Document, Schema, SchemaType } from "mongoose";

export interface IExceptionSchedule {
  parcels: string[];
  day: string; // 2023-03-21
}

const ExceptionScheduleSchema = new Schema(
  {
    day: { type: String, required: true },
    parcels: [{ type: Schema.Types.ObjectId, required: true, ref: "Parcel" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export interface IExceptionScheduleModel extends IExceptionSchedule, Document {}

export default mongoose.model<IExceptionScheduleModel>(
  "ExceptionSchedule",
  ExceptionScheduleSchema
);
