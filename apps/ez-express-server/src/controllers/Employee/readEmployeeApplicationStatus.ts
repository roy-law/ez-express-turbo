import { NextFunction, Request, Response } from "express";
import Logging from "../../library/Logging";
import Employee from "../../models/Employee";
import { EmployeeApplicationStatus } from "@repo/types";

export const readEmployeeApplicationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone } = req.query;

  try {
    // check if db has the same employee with the same phone number
    const dbUser = await Employee.findOne({ phone });

    // if not in db, return not started
    if (!dbUser) {
      return res
        .status(200)
        .send({ applicationStatus: EmployeeApplicationStatus.NotStarted });
    }

    // if in db, return the application status
    return res
      .status(200)
      .send({ applicationStatus: dbUser.applicationStatus });
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
