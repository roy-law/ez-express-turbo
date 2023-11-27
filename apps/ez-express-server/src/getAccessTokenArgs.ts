import jwtDecode from "jwt-decode";

interface AccessTokenArgs {
  email: string;
  iss: string;
  sub: string;
  aud: string[];
  iat: Date;
  exp: Date;
  azp: string;
  scope: string;
  permissions: string[];
  token?: string;
}

// TODO: add middleware to deal with empty email in the accessToken
export const getAccessTokenArgs = (accessToken?: string): AccessTokenArgs => {
  return { ...jwtDecode(accessToken ?? ""), token: accessToken };
};
