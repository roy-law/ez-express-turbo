import * as yup from "yup";

const { string, object } = yup;

export const userInformationUpdateSchema = object({
  country: string().required(),
  province: string().required(),
  city: string().required("City is a required field."),
  streetAddress: string().required("Street address is a required field."),
  unit: string().notRequired(),
  postalCode: string()
    .required("Postal code is a required field.")
    .length(6, "Postal code is 6 characters.")
    .matches(
      /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
    ),
  phone: string()
    .required("Phone number is a required field.")
    .length(10, "Phone number is 10 digits.")
    .matches(/^\d+$/, "Phone number has only numbers."),
  wechat: string().notRequired(),
  companyName: string().required("Company name is a required field"),
  hstNumber: string()
    .matches(/^\d+$/, "Enter only first 9 digits")
    .length(9, "Enter only first 9 digits")
    .required("GST/HST number is a required field"),
}).required();

export type UserInformationUpdateType = yup.InferType<
  typeof userInformationUpdateSchema
>;
