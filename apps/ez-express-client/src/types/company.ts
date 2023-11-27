import * as yup from "yup";

const { string, object } = yup;

export const companySchema = object({
  companyName: string().required("Company name is a required field"),
  hstNumber: string().required("GST/HST number is a required field"),
});

export type Company = yup.InferType<typeof companySchema>;
