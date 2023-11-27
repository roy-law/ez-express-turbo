import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { NavLogo } from "../components/NavLogo";
import { useUserContext } from "../providers/UserContextProvider";
import { AuthedRoutes } from "../types/routes";

export const Landing = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { token } = useUserContext();
  const navigate = useNavigate();

  const isValidAdmin = token?.permissions?.includes("admin") && isAuthenticated;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 justify-center items-center">
        {!isValidAdmin && (
          <button
            onClick={() => loginWithRedirect()}
            className={isValidAdmin ? "" : "animate-bounce"}
          >
            <NavLogo />
          </button>
        )}
        {isValidAdmin && (
          <button onClick={() => navigate(AuthedRoutes.DASHBOARD)}>
            <p className="text-lg">Go</p>
          </button>
        )}
      </div>
    </div>
  );
};
