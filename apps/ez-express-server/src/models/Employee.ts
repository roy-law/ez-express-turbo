import mongoose, { Document, Schema } from "mongoose";
import { Employee, EmployeeApplicationStatus, EmployeeRole } from "@repo/types";

const EmployeeSchema = new Schema(
  {
    name: { type: Schema.Types.String, required: false },
    legalName: { type: Schema.Types.String, required: false },
    email: { type: Schema.Types.String, required: false, unique: true },
    phone: { type: Schema.Types.String, required: true, unique: true },
    picture: { type: Schema.Types.String, required: false },
    role: { type: String, enum: Object.values(EmployeeRole), required: false },
    applicationStatus: {
      type: String,
      enum: Object.values(EmployeeApplicationStatus),
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<Employee & Document>("Employee", EmployeeSchema);
