import { Time } from "./Time";

export const ScheduleTimeWindow = {
  MORNING: "MORNING",
  AFTERNOON: "AFTERNOON",
  EVENING: "EVENING",
  NIGHT: "NIGHT",
} as const;

export type ScheduleTimeWindow =
  (typeof ScheduleTimeWindow)[keyof typeof ScheduleTimeWindow];

export type Schedule = Time & {
  dispatchingCenter: string; // DispatchingCenterId
  day: string;
  timeWindow?: ScheduleTimeWindow;
  routeName: string;
  routerColor: string;
  assignedDriver: string; // EmployeeId
  assignedVehicle: string; // VehicleId
  orders: string[]; // OrderId
  startedTime?: Date;
  endedTime?: Date;
};
