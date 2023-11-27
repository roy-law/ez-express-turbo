import axios from "axios";
import { User } from "../../types";

export async function createUser(user: User) {
  const response = await axios.post(
    `${import.meta.env["VITE_API_URL"]}/api/user`,
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
}
