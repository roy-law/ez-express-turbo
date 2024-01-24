import { Outlet } from "react-router-dom";
import { useProtectionNavigation } from "../hooks/useProtectionNavigation";

export function DefaultLayout() {
  useProtectionNavigation();

  return (
    <>
      <Outlet />
    </>
  );
}
