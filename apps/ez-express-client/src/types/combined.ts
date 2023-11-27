import * as yup from "yup";
import {
  eastYork,
  markham,
  mississauga,
  newmarket,
  northYork,
  richmondHill,
  scarborough,
  toronto,
  vaughan,
  etobicoke,
  ajax,
  pickering,
  stouffville,
} from "@repo/utils";

const { string, object } = yup;

export const userInformationUpdateSchema = object({
  country: string().required(),
  province: string().required(),
  city: string().required("City is a required field."),
  streetAddress: string().required("Street address is a required field."),
  unit: string().notRequired(),
  postalCode: string()
    .required("Postal code is a required field.")
    .test(
      `test-postal-code`,
      "Sorry, this postal code is not in our servicing area.",
      function (value) {
        const { path, createError } = this;

        const allPostalCode = [
          ...etobicoke,
          ...scarborough,
          ...markham,
          ...eastYork,
          ...northYork,
          ...richmondHill,
          ...vaughan,
          ...newmarket,
          ...toronto,
          ...mississauga,
          ...ajax,
          ...pickering,
          ...stouffville
        ];

        return (
          (value && allPostalCode.some((p) => p === value.slice(0, 3))) ||
          createError({
            path,
            message: "Sorry, this postal code is not in our servicing area.",
          })
        );
      },
    ),
  phone: string().required("Phone number is a required field."),
  wechat: string().notRequired(),
  companyName: string().required("Company name is a required field"),
  hstNumber: string().required("GST/HST number is a required field"),
}).required();

export type UserInformationUpdateType = yup.InferType<
  typeof userInformationUpdateSchema
>;
