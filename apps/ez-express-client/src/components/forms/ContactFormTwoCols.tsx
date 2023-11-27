import React from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import InputMask from "react-input-mask";

interface ContactFormTwoColsProps {
  errors: FieldErrors<{
    phone: any;
    wechat: any;
  }>;
  phoneFields: UseFormRegisterReturn;
  wechatFields: UseFormRegisterReturn;
  emailFields: UseFormRegisterReturn;
}

export const ContactFormTwoCols = ({
  errors,
  phoneFields,
  wechatFields,
  emailFields,
}: ContactFormTwoColsProps) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-8 border-b border-gray-900/10 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Contact Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6 md:col-span-2">
        <div className="sm:col-span-3">
          <label
            htmlFor="phone-number"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Phone Number
          </label>
          <div className="mt-2">
            <InputMask
              type="text"
              mask={"+1 (999) 999-9999"}
              id="phone-number"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...phoneFields}
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="company-email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              disabled
              type="text"
              id="company-email"
              {...emailFields}
              className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="wechat"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Wechat
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="wechat"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...wechatFields}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
