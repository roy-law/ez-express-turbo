import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Logging from "../../library/Logging";
import Employee from "../../models/Employee";
import { EmployeeApplicationStatus } from "@repo/types";

export const readEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone } = req.query;

  try {
    const dbUser = await Employee.findOne({ phone });

    if (!dbUser) {
      return res.status(404).send({ message: "Employee not found" });
    }

    const employee = await Employee.findOne({ phone });

    return res.status(200).send(employee);
  } catch (error) {
    Logging.error(error);
    return res.status(500).send({ message: "Sorry, something went wrong" });
  }
};