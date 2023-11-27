import { useAuth0 } from "@auth0/auth0-react";
import { createContext, ReactElement, useContext } from "react";
import { useAuth0AccessToken } from "../hooks/useAuth0AccessToken";

interface AccessToken {
  aud?: string[];
  exp?: Date;
  azp?: string;
  iat?: Date;
  iss: string;
  permissions?: string[];
  scope?: string;
  sub?: "";
  token: string;
}

interface UserContextType {
  token?: AccessToken;
  isValidAdmin: boolean;
}

const UserContext = createContext<UserContextType>({
  token: undefined,
  isValidAdmin: false,
});

interface UserContextProviderProps {
  children: ReactElement;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const auth0 = useAuth0();
  const auth0AccessToken = useAuth0AccessToken();

  const isValidAdmin =
    auth0AccessToken.permissions?.includes("admin") && auth0.isAuthenticated;

  return (
    <UserContext.Provider
      value={{
        token: auth0AccessToken,
        isValidAdmin: isValidAdmin ?? false,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
