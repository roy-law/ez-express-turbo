import { useAuth0 } from "@auth0/auth0-react";
import { NavLogo } from "./NavLogo";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthedRoutes, AuthedOnboardRoutes } from "../types/routes";
import { ClipLoader } from "react-spinners";
import { useUserStore } from "../store/user/useUserStore";
import { AccessToken, useAuth0AccessToken } from "../hooks/useAuth0AccessToken";
import { useUserApi } from "../hooks/useUserApi";
import { useEmailExistApi } from "../hooks/useEmailExistApi";
import { useDepotApi } from "../hooks/useDepotApi";
import jwtDecode from "jwt-decode";

export function PublicNavBarTabs() {
  const navigate = useNavigate();
  const { loginWithPopup } = useAuth0();

  useAuth0AccessToken();
  useUserApi();
  useEmailExistApi();
  useDepotApi();

  const { userData, isAuthenticated, token } = useUserStore();

  const permissions = useMemo(() => {
    return token ? (jwtDecode(token) as AccessToken).permissions : [];
  }, [token]);

  const isValidCustomer =
    isAuthenticated &&
    userData.isTermsChecked &&
    userData.status === 3 &&
    permissions?.includes("customer");

  const determineNavigation = useCallback(() => {
    if (isAuthenticated) {
      // If user on 0 or 1 status and clicked login and user created successfully, navigate user to company form
      if (userData.status === 0 || userData.status === 1) {
        return navigate(AuthedOnboardRoutes.ONBOARD_FORM_COMPANY);
      }

      // If user on 2 status and clicked login and user created successfully, navigate user to depot form
      if (userData.status === 2) {
        return navigate(AuthedOnboardRoutes.ONBOARD_FORM_DEPOT);
      }

      if (userData.status === 3) {
        // If user on 3 status and clicked login and user created successfully, navigate user to dashboard
        if (permissions?.includes("customer") && userData.isTermsChecked) {
          return navigate(AuthedRoutes.DASHBOARD);
        } else {
          return navigate(AuthedOnboardRoutes.ONBOARD_SUCCESSFUL);
        }
      }
    }
  }, [
    isAuthenticated,
    userData.status,
    userData.isTermsChecked,
    navigate,
    permissions,
  ]);

  const login = () => {
    loginWithPopup();
    determineNavigation();
  };

  const continueSignup = () => {
    determineNavigation();
  };

  return (
    <div className="isolate px-6 lg:px-8">
      <nav className="flex items-center justify-between" aria-label="Global">
        <div className="flex-1">
          <NavLogo />
        </div>

        <div className="">
          {false ? (
            <ClipLoader size={10} />
          ) : !isAuthenticated && !userData.status ? (
            <button
              type="button"
              onClick={login}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          ) : isValidCustomer ? (
            <button
              type="button"
              onClick={continueSignup}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Continue to dashboard
              <span className="pl-2" aria-hidden="true">
                &rarr;
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={continueSignup}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Continue to Sign up
              <span className="pl-2" aria-hidden="true">
                &rarr;
              </span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
