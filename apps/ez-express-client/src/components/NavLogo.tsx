import React, { useMemo } from "react";
import { matchPath, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { UnAuthedRoutes } from "../types/routes";

interface NavLogoProps {
  size?: number;
}

export function NavLogo({ size }: NavLogoProps) {
  const { pathname } = useLocation();

  const logoPath = useMemo(() => {
    const matchedUnAuthedRoutes = Object.values(UnAuthedRoutes)
      .map((pattern) => !!matchPath(pattern, pathname))
      .filter(Boolean);

    if (matchedUnAuthedRoutes.length > 0) {
      return UnAuthedRoutes.LANDING;
    } else {
      return pathname;
    }
  }, [pathname]);

  return (
    <a href={logoPath} className="-m-1.5 p-1.5">
      <span className="sr-only">EZ Express Inc.</span>
      <img width={size ?? 70} height={size ?? 70} src={logo} alt="" />
    </a>
  );
}
