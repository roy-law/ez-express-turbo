import mongoose, { Document, Schema } from "mongoose";
import { Employee, EmployeeRole } from "@repo/types";

const EmployeeSchema = new Schema(
  {
    name: { type: Schema.Types.String, required: true, unique: true },
    legalName: { type: Schema.Types.String, required: false },
    email: { type: Schema.Types.String, required: true, unique: true },
    phone: { type: Schema.Types.String, required: true, unique: true },
    picture: { type: Schema.Types.String, required: false },
    role: { type: String, enum: Object.values(EmployeeRole), required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<Employee & Document>("Employee", EmployeeSchema);
