import * as yup from "yup";

const { string, object, mixed, number } = yup;
import { Address } from "./address";
import { Contact } from "./contact";
import { Timestamps } from "./timestamps";

export enum PackageSize {
  Standard = "Standard",
  Exceptional = "Exceptional",
}

export enum PackageStatus {
  Submitted = "Submitted",
  Confirmed = "Confirmed",
  PickedUp = "Picked up",
  Dispatched = "Dispatched",
  OnTheWay = "On the Way",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
  Rejected = "Rejected",
  Returned = "Returned",
}

export const PackageStatusAry = [
  PackageStatus.Submitted,
  PackageStatus.Confirmed,
  PackageStatus.PickedUp,
  PackageStatus.Dispatched,
  PackageStatus.OnTheWay,
  PackageStatus.Delivered,
  PackageStatus.Cancelled,
  PackageStatus.Rejected,
  PackageStatus.Returned,
];

export const packageSizeOptionSchema = object({
  id: mixed<PackageSize>()
    .oneOf(Object.values(PackageSize), "Choose a package size")
    .required("Choose a package size"),
  priceValue: number().required("Choose a package size"),
  title: string(),
  description: string(),
  price: string(),
});

export const parcelRequestSchema = object({
  notes: string().notRequired(),
  email: string().email().notRequired(),
  phone: string()
    .required("Phone number is a required field.")
    .length(10, "Phone number is 10 digits.")
    .matches(/^\d+$/, "Phone number has only numbers."),
  wechat: string().notRequired(),
  firstName: string().required("First name required"),
  lastName: string().required("Last name required"),
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
  packageSize: mixed().oneOf(
    [PackageSize.Standard, PackageSize.Exceptional],
    "Choose a package size",
  ),
  price: number().required(),
  depotId: string().required(),
});

export const parcelFormScehema = object({
  notes: string().notRequired(),
  email: string().email().notRequired(),
  phone: string()
    .required("Phone number is a required field.")
    .length(10, "Phone number is 10 digits.")
    .matches(/^\d+$/, "Phone number has only numbers."),
  wechat: string().notRequired(),
  firstName: string().required("First name required"),
  lastName: string().required("Last name required"),
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
  packageSize: packageSizeOptionSchema,
});

export const shippingLabelSchema = object({
  numberOfLabels: number()
    .required()
    .integer()
    .min(1, "Enter a greater than 0 number"),
});

export type ParcelRequest = yup.InferType<typeof parcelRequestSchema>;
export type ParcelForm = yup.InferType<typeof parcelFormScehema>;
export type ParcelSizeOption = yup.InferType<typeof packageSizeOptionSchema>;

export interface ParcelResponse extends Address, Timestamps, Contact {
  _id: string;
  depotId: string;
  packageSize: PackageSize;
  price: number;
  trackingNumber: string;
  qrcode: string;
  status: PackageStatus;
  notes: string;
}
