import { useAuth0 } from "@auth0/auth0-react";
import jwtDecode from "jwt-decode";
import { useQuery } from "react-query";
import { useUserStore } from "../store/user/useUserStore";

export interface AccessToken {
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

export const useAuth0AccessToken = (): AccessToken => {
  const {setToken, setIsAuthenticated} = useUserStore()
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const { data, isSuccess } = useQuery(
    ["accessToken", user?.email, isAuthenticated],
    () =>
      getAccessTokenSilently({
        authorizationParams: {
          audience: "https://api.super-x.com",
          scope: "email profile",
        },
      }),
    {
      enabled: isAuthenticated && !!user?.email,
      onSuccess: (data) => {
        setToken(data) 
        setIsAuthenticated(isAuthenticated)}
    },
  );

  const tokenProps = isSuccess
    ? { ...jwtDecode<any>(data), token: data }
    : { token: data };

  return tokenProps;
};
