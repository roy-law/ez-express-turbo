import * as yup from "yup";

const { string, object, boolean } = yup;

export const userSchema = object({
  firstName: string().required("First name is a required field"),
  lastName: string().required("Last name is a required field"),
  name: string().required("Name is a required field"),
  email: string().email().required("Email is a required field"),
  picture: string().url().notRequired(),
  phoneNumber: string().notRequired(),
  isEmailVerified: boolean().notRequired(),
  isTermsChecked: boolean().notRequired(),
  locale: string().required(),
});

export type OnboardingStatus = 0 | 1 | 2 | 3;

export type User = yup.InferType<typeof userSchema>;
export type UserResponse = User & {
  status: OnboardingStatus;
  companyName: string;
  hstNumber: string;
};
