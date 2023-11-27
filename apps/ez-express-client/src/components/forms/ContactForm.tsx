import React from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import InputMask from "react-input-mask";

interface ContactFormProps {
  errors: FieldErrors<{ phone: string; wechat: string }>;
  phoneFields: UseFormRegisterReturn;
  wechatFields: UseFormRegisterReturn;
}

//** Onboard contact form with stacked layout */
export const ContactForm = ({
  errors,
  phoneFields,
  wechatFields,
}: ContactFormProps) => {
  return (
    <div className="m-10 space-y-6 pt-8 sm:space-y-5 sm:pt-10">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Depot Contact Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Please fill in contact details about your depot
        </p>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="phone-number"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Phone Number
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <InputMask
            type="text"
            mask={"+1 (999) 999-9999"}
            id="phone-number"
            {...phoneFields}
            autoComplete="tel-national"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="+1 (513) 888-9999"
          />
          <p className=" text-sm text-red-600 mt-2" id="phone-number-error">
            {errors.phone?.message}
          </p>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="wechat-number"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Wechat (optional)
        </label>
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <input
            type="text"
            id="wechat-number"
            {...wechatFields}
            placeholder="wechat13398078909"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};
