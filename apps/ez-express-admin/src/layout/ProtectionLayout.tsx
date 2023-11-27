import { Outlet } from "react-router-dom";
import { useUserContext } from "../providers/UserContextProvider";

export const ProtectionLayout = () => {
  const { isValidAdmin } = useUserContext();
  return <>{isValidAdmin && <Outlet />}</>;
};
