import { Address } from "./Address";
import { Contact } from "./Contact";
import { Time } from "./Time";

export type CustomerContact = Address &
  Contact &
  Time & {
    name: string;
    firstName?: string;
    lastName?: string;
    depot: string; // DepotId
    notes?: string[];
  };
