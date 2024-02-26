import { ManagementClient } from "auth0";

export const auth0ManagementApi = new ManagementClient({
  domain: process.env.AUTH0_MANAGEMENT_API_CLIENT_DOMAIN || "",
  clientId: process.env.AUTH0_MANAGEMENT_API_CLIENT_ID || "",
  clientSecret: process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET || "",
});
