import { Contact } from "./Contact";
import { Time } from "./Time";

export const EmployeeApplicationStatus = {
  NotStarted: 0,
  InProgress: 1,
  PendingApproval: 2,
  Approved: 3,
  Rejected: 4,
  Removed: 5,
} as const;

export type EmployeeApplicationStatus =
  (typeof EmployeeApplicationStatus)[keyof typeof EmployeeApplicationStatus];

export const EmployeeRole = {
  Admin: "Admin",
  DepotMaster: "DepotMaster",
  Driver: "Driver",
  Visitor: "Visitor",
} as const;

export type EmployeeRole = (typeof EmployeeRole)[keyof typeof EmployeeRole];

export type Employee = Contact &
  Time & {
    username: string;
    picture: string;
    role: EmployeeRole;
    applicationStatus: EmployeeApplicationStatus;
  };
