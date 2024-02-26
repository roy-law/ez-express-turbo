import { NextFunction, Request, Response } from "express";
import Logging from "../../library/Logging";
import Employee from "../../models/Employee";
import { EmployeeApplicationStatus } from "@repo/types";

export const updateEmployeeApplicationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone } = req.query;
  const { applicationStatus } = req.body;

  try {
    const dbUser = await Employee.findOne({ phone });

    if (!dbUser) {
      return res.status(404).send("Employee not found");
    }

    if (
      ![
        EmployeeApplicationStatus.InProgress,
        EmployeeApplicationStatus.PendingApproval,
      ].includes(applicationStatus)
    ) {
      return res.status(400).send("Invalid application status");
    }

    dbUser.applicationStatus = applicationStatus;
    dbUser.save();

    return res.status(200).send(dbUser);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
