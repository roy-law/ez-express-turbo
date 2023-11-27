import React from "react";
import {
  Controller,
  FieldErrors,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import InputMask from "react-input-mask";
import { getCityByPostalCode } from "@repo/utils";

interface AddressFormTwoColsProps {
  errors: FieldErrors<{
    country: any;
    province: any;
    city: any;
    postalCode: any;
    streetAddress: any;
    unit: any;
  }>;
  countryFields: UseFormRegisterReturn;
  provinceFields: UseFormRegisterReturn;
  cityFields: UseFormRegisterReturn;
  streetAddressFields: UseFormRegisterReturn;
  unitFields: UseFormRegisterReturn;
  control: any;
  setValue: UseFormSetValue<any>;
}

export const AddressFormTwoCols = ({
  errors,
  countryFields,
  provinceFields,
  cityFields,
  unitFields,
  streetAddressFields,
  control,
  setValue,
}: AddressFormTwoColsProps) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-8 border-b border-gray-900/10 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Depot Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6 md:col-span-2">
        <div className="sm:col-span-3 sm:col-start-1">
          <label
            htmlFor="unit"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Apartment, suite, etc. (optional)
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="unit"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...unitFields}
            />
          </div>
        </div>

        <div className="col-span-4">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Street address
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...streetAddressFields}
            />
          </div>
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            City
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="city"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...cityFields}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="region"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            State / Province
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="region"
              className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...provinceFields}
              disabled
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="country"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Country
          </label>
          <div className="mt-2">
            <select
              id="country"
              autoComplete="country-name"
              {...countryFields}
              disabled
              className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>Canada</option>
            </select>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            ZIP / Postal code
          </label>
          <div className="mt-2">
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => (
                <InputMask
                  type="text"
                  id="postal-code"
                  mask={"a9a 9a9"}
                  {...field}
                  onChange={(e) => {
                    return field.onChange(e.target.value.toUpperCase());
                  }}
                  onBlur={(e) => {
                    field.onBlur();
                    if (!errors.postalCode?.message) {
                      const zip = e.target.value.toUpperCase();
                      setValue("city", getCityByPostalCode(zip));
                    }
                  }}
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
