import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils/styles/classNames";

interface PackageSizeRadioOptionsProps {
  errorMessage: string;
  packageSizes: any[];
  selectedPackageSize: any;
  setSelectedPackageSize: (sth: any) => void;
}

export const PackageSizeRadioOptions = ({
  errorMessage,
  packageSizes,
  selectedPackageSize,
  setSelectedPackageSize,
}: PackageSizeRadioOptionsProps) => {
  return (
    <div className="mt-10 border-t border-gray-200 pt-10">
      <RadioGroup name={"packageSize"} value={selectedPackageSize}>
        <RadioGroup.Label className="text-lg font-medium text-gray-900">
          Package size
        </RadioGroup.Label>

        <fieldset className="pt-5">
          <legend className="sr-only">Plan</legend>
          <div className="flex flex-row justify-between space-x-4">
            {packageSizes.map((plan) => (
              <button
                type="button"
                onClick={() => setSelectedPackageSize(plan)}
                key={plan.id}
                className={`flex items-start rounded-md ${
                  selectedPackageSize.id === plan.id
                    ? "border-indigo-500 border-2"
                    : "border-gray-300 border"
                } flex-1 p-4 flex-col`}
              >
                <div className="flex flex-row justify-between self-stretch mb-2">
                  <p className="text-sm font-medium">{plan.id}</p>
                  <CheckCircleIcon
                    className={classNames(
                      selectedPackageSize.id !== plan.id ? "invisible" : "",
                      "h-5 w-5 text-indigo-600",
                    )}
                    aria-hidden="true"
                  />
                </div>
                <p className="text-sm  text-gray-500">{plan.description}</p>
                <p className="text-sm font-medium mt-6 italic">{plan.price}</p>
              </button>
            ))}
          </div>
        </fieldset>
      </RadioGroup>
      <p className=" text-sm text-red-600 mt-2" id="city-error">
        {errorMessage}
      </p>
    </div>
  );
};
