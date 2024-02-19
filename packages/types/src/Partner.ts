import { Time } from "./Time";

export const OnboardingStatus = {
  PendingCompany: 0,
  PendingDepot: 1,
  Approved: 2,
  Rejected: 3,
} as const;

export type OnboardingStatus =
  (typeof OnboardingStatus)[keyof typeof OnboardingStatus];

export type Partner = Time & {
  email: string;
  depots?: string[]; // DepotId
  locale?: string;
  name: string;
  firstName?: string;
  lastName?: string;
  companyName: string;
  hstNumber: string;
  isEmailVerified: boolean;
  onboardingStatus: OnboardingStatus;
};
