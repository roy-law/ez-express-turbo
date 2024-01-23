import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { companySchema } from "../types";
import { AuthedOnboardRoutes } from "../types/routes";
import { useUserContext } from "../providers/UserContextProvider";
import InputMask from "react-input-mask";

export function FormCompany() {
  const navigate = useNavigate();
  const { token } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      hstNumber: "",
    },
    resolver: yupResolver(companySchema),
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess(data) {
      queryClient.setQueryData(["user", token?.token], data);
      navigate(AuthedOnboardRoutes.ONBOARD_FORM_DEPOT);
    },
  });

  return (
    <form
      className="flex flex-col flex-1"
      onSubmit={handleSubmit((data) => {
        mutate({ token: token?.token, status: 2, ...data });
      })}
    >
      <div className="m-10 space-y-6 pt-8 sm:space-y-5 sm:pt-10 flex-1">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Company Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Please fill in details about your company
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Company name
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <div className="flex flex-row items-center">
                <input
                  type="text"
                  id="companyName"
                  placeholder="Company name"
                  {...register("companyName")}
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                />
                {!!errors.companyName?.message && (
                  <ExclamationCircleIcon
                    className="h-5 w-5 text-red-500 ml-2"
                    aria-hidden="true"
                  />
                )}
              </div>
              <p className="text-sm text-red-600 mt-2" id="company-name-error">
                {errors.companyName?.message}
              </p>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="hstNumber"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              GST/HST program number
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <div className="flex flex-row items-center">
                <InputMask
                  type="text"
                  id="hstNumber"
                  mask={"99999 9999 RT0001"}
                  {...register("hstNumber")}
                  placeholder="12345 6789 RT0001"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                />
                {!!errors.hstNumber?.message && (
                  <ExclamationCircleIcon
                    className="h-5 w-5 text-red-500 ml-2"
                    aria-hidden="true"
                  />
                )}
              </div>
              {!errors.hstNumber?.message && (
                <p
                  className="text-sm text-gray-600 mt-2 "
                  id="hst-number-error"
                >
                  {"Enter the first 9 digits of your company's GST/HST number"}
                </p>
              )}

              <p className="text-sm text-red-600 mt-2" id="hst-number-error">
                {errors.hstNumber?.message}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-10">
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Next Step
        </button>
      </div>
    </form>
  );
}
