import {
  Controller,
  FieldErrors,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import InputMask from "react-input-mask";
import { getCityByPostalCode } from "@repo/utils";

interface AddressFormProps {
  errors: FieldErrors<{
    country: string;
    province: string;
    city: string;
    unit: string;
    postalCode: string;
    streetAddress: string;
  }>;
  countryFields: UseFormRegisterReturn;
  provinceFields: UseFormRegisterReturn;
  cityFields: UseFormRegisterReturn;
  unitFields: UseFormRegisterReturn;
  streetAddressFields: UseFormRegisterReturn;
  control: any;
  setValue: UseFormSetValue<any>;
}

export const AddressForm = ({
  errors,
  countryFields,
  provinceFields,
  cityFields,
  streetAddressFields,
  setValue,
  unitFields,
  control,
}: AddressFormProps) => {
  return (
    <div className="m-10 space-y-6 pt-8 sm:space-y-5 sm:pt-10">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Depot Address Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Please fill in address details about your depot
        </p>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="street-address"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Street address
        </label>
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <input
            type="text"
            id="street-address"
            {...streetAddressFields}
            autoComplete="address-line1"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <p className=" text-sm text-red-600 mt-2" id="street-address-error">
            {errors.streetAddress?.message}
          </p>
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="unit"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Apartment, suite, etc. (optional)
        </label>
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <input
            type="text"
            id="unit"
            autoComplete="address-line2"
            {...unitFields}
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <p className=" text-sm text-red-600 mt-2" id="street-address-error">
            {errors.unit?.message}
          </p>
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="postal-code"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          ZIP / Postal code
        </label>
        <div className="mt-1 sm:col-span-2 sm:mt-0">
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
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              />
            )}
          />
          <p className=" text-sm text-red-600 mt-2" id="postal-code-error">
            {errors.postalCode?.message}
          </p>
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          City
        </label>
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <input
            type="text"
            id="city"
            {...cityFields}
            autoComplete="address-level2"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
          />
          <p className=" text-sm text-red-600 mt-2" id="city-error">
            {errors.city?.message}
          </p>
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Country
        </label>
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <select
            id="country"
            {...countryFields}
            autoComplete="country-name"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
          >
            <option>Canada</option>
          </select>
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="region"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          State / Province
        </label>
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <select
            id="region"
            {...provinceFields}
            autoComplete="region-name"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
          >
            <option>Ontario</option>
          </select>
        </div>
      </div>
    </div>
  );
};
