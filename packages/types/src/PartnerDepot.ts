import { Address } from "./Address";
import { Contact } from "./Contact";
import { Time } from "./Time";

export type PartnerDepot = Address &
  Contact &
  Time & {
    partner: string; // Partner Object Id
    orders?: string[];
  };
