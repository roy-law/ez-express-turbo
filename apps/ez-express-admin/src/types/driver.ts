import * as yup from "yup";

const { string, object } = yup;

export const driverSchema = object({
  username: string().required(),
  phone: string().required(),
  email: string().email().required(),
});

export type Driver = yup.InferType<typeof driverSchema>;
