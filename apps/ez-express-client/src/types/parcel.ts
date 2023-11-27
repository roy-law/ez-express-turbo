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

export const packageSizeOptionSchema = object({
  id: mixed<PackageSize>()
    .oneOf(Object.values(PackageSize), "Choose a package size")
    .required("Choose a package size"),
  priceValue: number().required("Choose a package size"),
  title: string(),
  description: string(),
  price: string(),
});

export interface Parcel {
  parcelsCount?: number;
  customerRef?: string;
  notes?: string;
  email?: string;
  phone?: string;
  wechat?: string;
  name?: string;
  country?: string;
  province?: string;
  city?: string;
  streetAddress?: string;
  unit?: string;
  postalCode?: string;
  formattedAddress?: string;
  packageSize?: PackageSize;
  price?: number;
  depotId?: string;
  trackingNumber?: string;
  qrcode?: string;
  status?: PackageStatus;
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const parcelRequestSchema = object({
  parcelsCount: number().notRequired(),
  customerRef: string().notRequired(),
  notes: string().notRequired(),
  email: string().email().notRequired(),
  phone: string().required("Phone number is a required field."),
  wechat: string().notRequired(),
  name: string().required("Name is a required field."),
  firstName: string().notRequired(),
  lastName: string().notRequired(),
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
  packageSize: mixed().oneOf(
    [PackageSize.Standard, PackageSize.Exceptional],
    "Choose a package size",
  ),
  price: number().required(),
  depotId: string().required(),
});

export const parcelFormScehema = object({
  parcelsCount: number().notRequired(),
  customerRef: string().notRequired(),
  notes: string().notRequired(),
  email: string().email().notRequired(),
  phone: string().required("Phone number is a required field."),
  wechat: string().notRequired(),
  name: string().required("Name is a required field."),
  firstName: string().notRequired(),
  lastName: string().notRequired(),
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
  customerRef: string;
  notes: string;
}
