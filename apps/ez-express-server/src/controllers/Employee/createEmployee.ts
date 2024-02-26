import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Logging from "../../library/Logging";
import Employee from "../../models/Employee";
import { EmployeeApplicationStatus } from "@repo/types";

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, phone, picture, name, legalName, role } = req.body;

  try {
    // check if db has the user with the same email
    const dbUser = await Employee.findOne({ phone });

    if (dbUser) {
      return res.status(400).send("Duplicate employee");
    }

    // if not in db, create it
    const employee = await Employee.create({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      picture,
      legalName,
      phone,
      role: role || "Visitor",
      applicationStatus: EmployeeApplicationStatus.InProgress,
    });

    return res.status(200).send(employee);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};
