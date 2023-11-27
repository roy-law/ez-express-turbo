import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

interface NavLogoProps {
  size?: number;
}

export function NavLogo({ size }: NavLogoProps) {
  const { pathname } = useLocation();
  return (
    <a href={pathname} className="-m-1.5 p-1.5">
      <span className="sr-only">EZ Express Inc.</span>
      <img width={size ?? 70} height={size ?? 70} src={logo} alt="" />
    </a>
  );
}
