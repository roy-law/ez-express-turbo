import React from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import InputMask from "react-input-mask";

interface CustomerInfoFormTwoColsProps {
  errors: FieldErrors<{
    phone: any;
    wechat: any;
    email: any;
    firstName: any;
    lastName: any;
  }>;
  nameFields: UseFormRegisterReturn;
  customerRefFields: UseFormRegisterReturn;
  phoneFields: UseFormRegisterReturn;
  wechatFields: UseFormRegisterReturn;
  notesFields: UseFormRegisterReturn;
}
export const CustomerInfoFormTwoCols = ({
  errors,
  phoneFields,
  notesFields,
  nameFields,
  customerRefFields,
}: CustomerInfoFormTwoColsProps) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-8 border-b border-gray-900/10 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Customer Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
        <div className="sm:col-span-3">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="name"
              autoComplete="name"
              {...nameFields}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-4">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Phone number
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <InputMask
                mask={"+1 (999) 999-9999"}
                type="text"
                id="phone-number"
                {...phoneFields}
                autoComplete="tel-national"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="+1 (555) 987-6543"
              />
              {/* <p className=" text-sm text-red-600 mt-2" id="city-error">
                    {errors.phone?.message}
                  </p> */}
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="customer-ref"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Ref#
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="customer-ref"
              {...customerRefFields}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Notes
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              rows={3}
              {...notesFields}
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Write a few sentences about the parcel.
          </p>
        </div>
      </div>
    </div>
  );
};
