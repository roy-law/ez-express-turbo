import { Time } from "./Time";

export const OnboardingStatus = {
  Pending: 0,
  Approved: 1,
  Rejected: 2,
} as const;

export type OnboardingStatus =
  (typeof OnboardingStatus)[keyof typeof OnboardingStatus];

export type Partner = Time & {
  email: string;
  depots?: string[]; // DepotId
  locale?: string;
  partnerName: string;
  hstNumber: string;
  isEmailVerified: boolean;
  onboardingStatus: OnboardingStatus;
};
