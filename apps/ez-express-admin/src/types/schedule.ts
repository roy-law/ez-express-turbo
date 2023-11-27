import { AreaName } from "./address";

export enum DriverScheduleType {
  Delivery = "Deilvery",
  Pickup = "Pickup",
}

export enum WorkingShift {
  Morning = "10:00 a.m. ~ 14:00 p.m.",
  Afternoon = "14:00 p.m. ~ 18:00 p.m.",
  Evening = "18:00 p.m. ~ 22:00 p.m.",
}

export interface Schedule {
  parcelsOrder: string[];
  day: string; // 2022-02-22
  predefinedArea: AreaName;
  assignedTo: string;
  type: DriverScheduleType;
  shift?: WorkingShift;
}
