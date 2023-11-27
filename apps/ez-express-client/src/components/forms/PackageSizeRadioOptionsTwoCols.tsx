import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Control, Controller } from "react-hook-form";
import { PackageSize, ParcelSizeOption } from "../../types";
import { classNames } from "../../utils/styles/classNames";

interface PackageSizeRadioOptionsProps {
  errorMessage: string;
  packageSizes: ParcelSizeOption[];
  selectedPackageSize: ParcelSizeOption;
  setSelectedPackageSize: (p: ParcelSizeOption) => void;
  disabled: boolean;
  control: Control<{
    customerRef: string;
    name: string;
    phone: string;
    streetAddress: string;
    unit: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
    notes: string;
    packageSize: {
      id: PackageSize;
      title: string;
      description: string;
      price: string;
      priceValue: number;
    };
  }>;
}

export const PackageSizeRadioOptionsTwoCols = ({
  errorMessage,
  packageSizes,
  disabled,
  selectedPackageSize,
  setSelectedPackageSize,
  control,
}: PackageSizeRadioOptionsProps) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-8 border-b border-gray-900/10 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Pricing
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          {
            "Simply update the package sizing without recreating the order when there are multiple orders for the same customer."
          }
        </p>
      </div>
      <div className="max-w-2xl space-y-10 md:col-span-2">
        <Controller
          control={control}
          name="packageSize"
          render={({ field }) => (
            <fieldset className="pt-5">
              <legend className="sr-only">Plan</legend>
              <div className="flex flex-row justify-between space-x-4">
                {packageSizes.map((plan) => (
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      setSelectedPackageSize(plan);
                      field.onChange(plan);
                    }}
                    key={plan.id}
                    className={`flex items-start rounded-md ${
                      selectedPackageSize.id === plan.id
                        ? "border-indigo-500 border-2 disabled:border-indigo-800 disabled:cursor-not-allowed"
                        : "border-gray-300 border"
                    } flex-1 p-4 flex-col`}
                  >
                    <div className="flex flex-row justify-between self-stretch mb-2">
                      <p className="text-sm font-medium">{plan.id}</p>
                      <CheckCircleIcon
                        className={classNames(
                          selectedPackageSize.id !== plan.id ? "invisible" : "",
                          `h-5 w-5 ${
                            disabled ? "text-indigo-800" : "text-indigo-600"
                          }`,
                        )}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-sm  text-gray-500">{plan.description}</p>
                    <p className="text-sm font-medium mt-6 italic">
                      {plan.price}
                    </p>
                  </button>
                ))}
              </div>
            </fieldset>
          )}
        />
        <p className=" text-sm text-red-600 mt-2" id="city-error">
          {errorMessage}
        </p>
      </div>
    </div>
  );
};
