import { useAuth0 } from "@auth0/auth0-react";
import jwtDecode from "jwt-decode";
import { useQuery } from "react-query";

export const useAuth0AccessToken = () => {
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
    { enabled: isAuthenticated && !!user?.email },
  );

  const tokenProps = isSuccess
    ? { ...jwtDecode<any>(data), token: data }
    : { token: data };

  return tokenProps;
};
