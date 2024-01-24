import { useNavigate } from "react-router-dom";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/api";
import { AuthedRoutes, UnAuthedRoutes } from "../types/routes";
import { useState } from "react";
import { useAccessToken, useIsCustomer } from "../store/auth/useAuthStore";

export function FormSuccessfulOnboarding() {
  const navigate = useNavigate();
  const token = useAccessToken();
  const isCustomer = useIsCustomer();
  const { width, height } = useWindowSize();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess(data) {
      queryClient.setQueryData(["user", token], data);
      navigate(AuthedRoutes.DASHBOARD);
    },
  });

  return (
    <>
      <Confetti width={width} height={height} />
      <div className="flex-1 flex-col flex bg-white px-6 lg:px-8 py-6 lg:py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            You are at the last step to finish onboarding!
          </h1>
        </div>
        <div className="flex flex-1 px-6 lg:px-8 justify-center items-center">
          <p className="mt-6 text-center text-base leading-7 text-gray-600">
            Our customer support will contact you for manual verification
          </p>
        </div>
        <div className="flex flex-row space-x-5 justify-center py-6 lg:py-10">
          <div className="flex items-start ">
            <div className="flex h-6 items-center">
              <input
                id="privacy-policy"
                aria-describedby="privacy policy"
                type="checkbox"
                checked={isPrivacyChecked}
                onChange={() => setIsPrivacyChecked(!isPrivacyChecked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="ml-1 text-sm leading-6">
              <a
                href={UnAuthedRoutes.PRIVACY_POLICY}
                className="text-base font-medium text-indigo-700 underline"
              >
                privacy policy
              </a>
            </div>
          </div>
          <div className="flex items-start ">
            <div className="flex h-6 items-center">
              <input
                id="terms-and-conditions"
                aria-describedby="terms-and-conditions"
                checked={isTermsChecked}
                onChange={() => setIsTermsChecked(!isTermsChecked)}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="ml-1 text-sm leading-6">
              <a
                href={UnAuthedRoutes.TERMS_AND_CONDITIONS}
                className="text-base font-medium text-indigo-700 underline"
              >
                terms & conditions
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="button"
            disabled={!isCustomer || !isTermsChecked || !isPrivacyChecked}
            onClick={() =>
              mutate({
                token: token,
                isTermsChecked: isTermsChecked && isPrivacyChecked,
              })
            }
            className="text-3xl  inline-flex items-center rounded-md border border-transparent bg-indigo-600 disabled:bg-gray-500 px-6 py-3 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}
