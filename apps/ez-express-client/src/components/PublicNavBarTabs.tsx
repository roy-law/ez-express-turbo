import { useAuth0 } from "@auth0/auth0-react";
import { NavLogo } from "./NavLogo";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthedRoutes, AuthedOnboardRoutes } from "../types/routes";
import { useIsUserApproved, useUser } from "../store/user/useUserStore";

import { useIsAuthenticated, useIsCustomer } from "../store/auth/useAuthStore";

export function PublicNavBarTabs() {
  const navigate = useNavigate();
  const { loginWithPopup } = useAuth0();

  const userData = useUser();
  const isAuthenticated = useIsAuthenticated();
  const isCustomer = useIsCustomer();
  const isUserApproved = useIsUserApproved(!!isCustomer);

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

      if (isUserApproved) {
        // If user on 3 status and clicked login and user created successfully, navigate user to dashboard
        return navigate(AuthedRoutes.DASHBOARD);
      } else {
        return navigate(AuthedOnboardRoutes.ONBOARD_SUCCESSFUL);
      }
    }
  }, [isAuthenticated, userData.status, isUserApproved, navigate]);

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
          {!isAuthenticated ? (
            <button
              type="button"
              onClick={login}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          ) : isUserApproved ? (
            <button
              type="button"
              onClick={continueSignup}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Continue to Dashboard
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
