import { useEffect } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { AuthedRoutes, UnAuthedRoutes } from "../types/routes";
import { useIsUserApproved } from "../store/user/useUserStore";
import { useIsCustomer } from "../store/auth/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";

export const useProtectionNavigation = () => {
  const navigate = useNavigate();
  const isCustomer = useIsCustomer();
  const isUserApproved = useIsUserApproved(!!isCustomer);
  const isValidCustomer = isCustomer && isUserApproved;

  const isFetching = useQueryClient().isFetching();
  const { pathname } = useLocation();

  useEffect(() => {
    const matchedAuthedRoutes = Object.values(AuthedRoutes)
      .map((pattern) => !!matchPath(pattern, pathname))
      .filter(Boolean);

    // just keep loading
    if (isFetching) return;

    // Does not care onboard form
    // navigate them back to landing when they are not authenticated but using a authenticated path
    if (!isValidCustomer && matchedAuthedRoutes.length > 0) {
      return navigate(UnAuthedRoutes.LANDING);
    }
  }, [pathname, isValidCustomer, isFetching, navigate]);
};
