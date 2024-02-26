import { NextFunction, Request, Response } from "express";
import Logging from "../../library/Logging";
import Employee from "../../models/Employee";
import { EmployeeApplicationStatus, EmployeeRole } from "@repo/types";
import { getAccessTokenArgs } from "../../getAccessTokenArgs";

const getRoleFromPermissions = (permissions: string[]) => {
  if (permissions.includes("admin")) {
    return EmployeeRole.Admin;
  } else if (permissions.includes("driver")) {
    return EmployeeRole.Driver;
  } else if (permissions.includes("depotmaster")) {
    return EmployeeRole.DepotMaster;
  } else {
    return EmployeeRole.Visitor;
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone } = req.query;
  const {
    email,
    picture,
    name,
    legalName,
    role,
    phone: newPhoneNumber,
    applicationStatus,
  } = req.body;

  const { permissions } = getAccessTokenArgs("");

  try {
    const dbUser = await Employee.findOne({ phone });

    if (!dbUser) {
      return res.status(404).send({ message: "Employee not found" });
    }

    if (role) {
      return res.status(401).send({ message: "Role cannot be updated" });
    }

    if (
      ![
        EmployeeApplicationStatus.InProgress,
        EmployeeApplicationStatus.PendingApproval,
      ].includes(applicationStatus)
    ) {
      return res
        .status(401)
        .send("Application can not be updated to this status");
    }

    const employee = await Employee.findOneAndUpdate(
      { phone },
      {
        email,
        phone: newPhoneNumber,
        picture,
        name,
        legalName,
        role: getRoleFromPermissions(permissions),
        applicationStatus,
      },
      { new: true }
    );

    return res.status(200).send(employee);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send({ message: "Sorry, something went wrong" });
  }
};
