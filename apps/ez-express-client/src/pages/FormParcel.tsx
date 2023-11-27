import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  PackageSize,
  ParcelForm,
  parcelFormScehema,
  ParcelSizeOption,
} from "../types";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { createParcel } from "../services/api/createParcel";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getPackageOptionByPostalCode,
  usePackageSizeOptions,
} from "../hooks/usePackageSizeOptions";
import { BackToHeader } from "../components/BackToHeader";
import { AuthedRoutes } from "../types/routes";
import { PackageSizeRadioOptions } from "../components/forms/PackageSizeRadioOptions";
import { useUserContext } from "../providers/UserContextProvider";
import InputMask from "react-input-mask";
import { getCityByPostalCode } from "@repo/utils";
import { useQueryKeys } from "../hooks/useQueryKeys";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export function FormParcel() {
  const navigate = useNavigate();
  const { depot, token } = useUserContext();
  const { dashboardQueryKeys } = useQueryKeys();

  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      customerRef: "",
      name: "",
      phone: "",
      streetAddress: "",
      unit: "",
      city: "",
      province: "Ontario",
      country: "Canada",
      postalCode: "",
      notes: "",
      packageSize: {
        id: PackageSize.Standard,
        title: "Standard",
        description: "",
        price: "Calculating...",
        priceValue: 0,
      },
    },
    resolver: yupResolver(parcelFormScehema),
  });

  const [postalCode, setPostalCode] = useState("");
  const packageSizes = usePackageSizeOptions(postalCode);
  const [selectedPackageSize, setSelectedPackageSize] =
    useState<ParcelSizeOption>(packageSizes[0]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(createParcel, {
    onSuccess(data) {
      queryClient.invalidateQueries(dashboardQueryKeys.DASHBOARD_TMR_PARCELS);
      queryClient.invalidateQueries(dashboardQueryKeys.DASHBOARD_TODAY_PARCELS);

      navigate(AuthedRoutes.DASHBOARD);
    },
  });

  const onSubmitHandler = (data: ParcelForm) => {
    if (depot && selectedPackageSize.priceValue > 0)
      mutate({
        ...data,
        depotId: depot?._id,
        price: selectedPackageSize.priceValue,
        packageSize: selectedPackageSize.id,
        token: token?.token,
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="pb-8">
      <BackToHeader />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-start-2 lg:col-span-2">
            <div className="">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <div className="mt-1">
                  <InputMask
                    id="phone-number"
                    type="text"
                    mask={"+1 (999) 999-9999"}
                    autoComplete="tel"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="+1 (555) 987-6543"
                    {...register("phone")}
                  />
                  <p className=" text-sm text-red-600 mt-2" id="city-error">
                    {errors.phone?.message}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      autoComplete="name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <p className=" text-sm text-red-600 mt-2" id="city-error">
                      {errors.name?.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <Controller
                      name={register("postalCode").name}
                      control={control}
                      render={({ field }) => (
                        <InputMask
                          type="text"
                          mask={"a9a 9a9"}
                          id="postal-code"
                          autoComplete="postal-code"
                          className="uppercase block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                          onBlur={(e) => {
                            field.onBlur();
                            if (!errors.postalCode?.message) {
                              const zip = e.target.value.toUpperCase();
                              setPostalCode(zip);

                              const selectedOption =
                                getPackageOptionByPostalCode(
                                  zip,
                                  selectedPackageSize.id as PackageSize,
                                );
                              setSelectedPackageSize(selectedOption);

                              setValue("city", getCityByPostalCode(zip));
                            }
                          }}
                          ref={(ref) => {
                            field.ref({
                              focus: () => ({}),
                            });
                          }}
                        />
                      )}
                    />
                    <p className=" text-sm text-red-600 mt-2" id="city-error">
                      {errors.postalCode?.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      {...register("city")}
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <p className=" text-sm text-red-600 mt-2" id="city-error">
                      {errors.city?.message}
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register("streetAddress")}
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <p className=" text-sm text-red-600 mt-2" id="city-error">
                      {errors.streetAddress?.message}
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apartment, suite, etc. (optional)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register("unit")}
                      id="apartment"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <p className=" text-sm text-red-600 mt-2" id="city-error">
                      {errors.unit?.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <div className="mt-1">
                    <select
                      id="region"
                      {...register("province")}
                      autoComplete="region-name"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                    >
                      <option>Ontario</option>
                    </select>
                    <p className=" text-sm text-red-600 mt-2" id="city-error">
                      {errors.province?.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      {...register("country")}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Canada</option>
                    </select>
                    <p className=" text-sm text-red-600 mt-2" id="city-error">
                      {errors.country?.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-full mt-4">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Notes
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  rows={3}
                  {...register("notes")}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Notes for the delivery person when dropping off the package.
              </p>
            </div>

            <div className="sm:col-span-2 mt-6">
              <label
                htmlFor="customer-ref"
                className="block text-sm font-medium text-gray-700"
              >
                Ref# (Use any reference number from your database system)
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  id="customer-ref"
                  {...register("customerRef")}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="ABC-COMPANY-01"
                />
                <p
                  className=" text-sm text-red-600 mt-2"
                  id="customer-ref-error"
                >
                  {errors.customerRef?.message}
                </p>
              </div>
            </div>

            <PackageSizeRadioOptions
              errorMessage={errors?.packageSize?.message ?? ""}
              packageSizes={packageSizes}
              selectedPackageSize={selectedPackageSize}
              setSelectedPackageSize={setSelectedPackageSize}
            />

            <div className="flex flex-row pt-5">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <label
                className="block text-sm font-medium italic text-gray-700"
                htmlFor="attention"
              >
                {
                  "Attention: All failure delivery attempt due to customer's exceptions will still be charged."
                }
              </label>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center mt-16">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 py-5 px-28 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
