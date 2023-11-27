import React from "react";
import { Outlet } from "react-router-dom";
import { useUserContextLogger } from "../hooks/useUserContextLogger";
import { useProtectionNavigation } from "../hooks/useProtectionNavigation";

export function DefaultLayout() {
  useUserContextLogger();
  useProtectionNavigation();

  return (
    <>
      <Outlet />
    </>
  );
}
