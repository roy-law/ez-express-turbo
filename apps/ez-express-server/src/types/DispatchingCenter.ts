import { Address } from "./Address";
import { Contact } from "./Contact";
import { Time } from "./Time";

export type DispatchingCenter = Contact &
  Address &
  Time & {
    name: string;
    address: string;
    contact: Contact;
    manager: string; // EmployeeId
  };
