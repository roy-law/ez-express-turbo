import * as yup from "yup";

const { string, object } = yup;

export const depotSchema = object({
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
  email: string().email().notRequired(),
});

export type Depot = yup.InferType<typeof depotSchema>;
export type DepotResponse = Depot & { formattedAddress: string; _id: string };
