import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../providers/UserContextProvider";
import { AuthedRoutes, UnAuthedRoutes } from "../types/routes";

export const useProtectionNavigation = () => {
  const navigate = useNavigate();
  const { isValidCustomer, isUserLoading } = useUserContext();
  const { pathname } = useLocation();

  useEffect(() => {
    const matchedAuthedRoutes = Object.values(AuthedRoutes)
      .map((pattern) => !!matchPath(pattern, pathname))
      .filter(Boolean);

    // just keep loading
    if (isUserLoading) return;

    // Does not care onboard form
    // navigate them back to landing when they are not authenticated but using a authenticated path
    if (!isValidCustomer && matchedAuthedRoutes.length > 0) {
      return navigate(UnAuthedRoutes.LANDING);
    }
  }, [pathname, isValidCustomer, isUserLoading, navigate]);
};
