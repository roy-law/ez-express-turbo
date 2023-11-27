import React from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import InputMask from "react-input-mask";

interface CompanyFormTwoColsProps {
  errors: FieldErrors<{ companyName: any; hstNumber: any }>;
  companyFields: UseFormRegisterReturn;
  hstNumberFields: UseFormRegisterReturn;
}
export const CompanyFormTwoCols = ({
  errors,
  companyFields,
  hstNumberFields,
}: CompanyFormTwoColsProps) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-8 border-b border-gray-900/10 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Company Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
        <div className="sm:col-span-4">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Company name
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                id="company-name"
                {...companyFields}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="hst-number"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            HST Number
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <InputMask
                type="text"
                mask={"99999 9999 RT0001"}
                {...hstNumberFields}
                id="hst-number"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
