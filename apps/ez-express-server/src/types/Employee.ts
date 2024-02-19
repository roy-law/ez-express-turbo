import { Contact } from "./Contact";
import { Time } from "./Time";

export const EmployeeRole = {
  Admin: "Admin",
  DepotMaster: "DepotMaster",
  Driver: "Driver",
} as const;

export type EmployeeRole = (typeof EmployeeRole)[keyof typeof EmployeeRole];

export type Employee = Contact &
  Time & {
    username: string;
    picture: string;
    role: EmployeeRole;
  };
