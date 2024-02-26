import { Request, Response } from "express";
import { auth0ManagementApi } from "../../library/Auth0Api";

export const updateEmployeeRole = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const response = await auth0ManagementApi.roles.assignUsers(
      { id: "rol_pgEGuEg3UVyBub5c" },
      {
        users: [userId],
      }
    );
    return res.status(200).send(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
