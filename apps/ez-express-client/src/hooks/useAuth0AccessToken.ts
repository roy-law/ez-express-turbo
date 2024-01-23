import { useAuth0 } from "@auth0/auth0-react";
import jwtDecode from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../store/user/useUserStore";
import { useEffect } from "react";

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
  const { setToken, setIsAuthenticated } = useUserStore();
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const { data, isSuccess } = useQuery({
    queryKey: ["accessToken", user?.email, isAuthenticated],
    queryFn: () =>
      getAccessTokenSilently({
        authorizationParams: {
          audience: "https://api.super-x.com",
          scope: "email profile",
        },
      }),
    enabled: isAuthenticated && !!user?.email,
  });

  useEffect(() => {
    if (data && isSuccess) {
      setToken(data);
      setIsAuthenticated(isAuthenticated);
    }
  }, [data, isAuthenticated, isSuccess, setToken, setIsAuthenticated]);

  const tokenProps = isSuccess
    ? { ...jwtDecode<any>(data), token: data }
    : { token: data };

  return tokenProps;
};
