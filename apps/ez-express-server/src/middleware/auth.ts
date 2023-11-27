import { Response, Request, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { requiredScopes, scopeIncludesAny } from "express-oauth2-jwt-bearer";
import { getAccessTokenArgs } from "../getAccessTokenArgs";

export const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE || "",
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL || "",
});

export const checkEmailIdentity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth0Email = req.auth?.payload["email"];
    const { email } = getAccessTokenArgs(req.headers.authorization);

    if (auth0Email === email) {
      next();
    } else {
      res.status(401).json({ message: "not valid" });
    }
  } catch (error) {
    res.status(400).json({ message: "not found" });
  }
};

//** Single Scopes */
export const checkAuthHealthCheckScope = requiredScopes("authHealthCheck");
export const checkAdminScope = requiredScopes("admin");
export const checkCustomerScope = requiredScopes("customer");
export const checkDriverScope = requiredScopes("driver");

//** Mixed Scopes */
export const checkAdminOrDriver = scopeIncludesAny("admin driver");
export const checkAdminOrCustomer = scopeIncludesAny("admin customer");
export const checkAdminOrDriverOrCustomer = scopeIncludesAny(
  "admin driver customer"
);
