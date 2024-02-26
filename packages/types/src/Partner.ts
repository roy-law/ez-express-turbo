import { Time } from "./Time";

export const AccountStatus = {
  NotStarted: 0,
  PendingCompany: 1,
  PendingDepot: 2,
  Approved: 3,
  Rejected: 4,
  Removed: 5,
} as const;

export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];

export type Partner = Time & {
  email: string;
  phone: string;
  wechat?: string;
  depots?: string[]; // DepotId
  locale?: string;
  picture?: string;
  name: string;
  firstName?: string;
  lastName?: string;
  companyName: string;
  hstNumber: string;
  isEmailVerified: boolean;
  accountStatus: AccountStatus;
};
