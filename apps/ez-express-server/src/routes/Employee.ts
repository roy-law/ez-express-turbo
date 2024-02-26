import express from "express";
import {
  createEmployee,
  deleteEmployee,
  readEmployee,
  readEmployeeApplicationStatus,
  updateEmployee,
  updateEmployeeApplicationStatus,
  updateEmployeeRole,
} from "../controllers/Employee";
import { checkJwt } from "../middleware/auth";

const router = express.Router();

router.get(
  "/",
  // checkJwt,
  readEmployee
);
router.get(
  "/applicationStatus",
  //   checkJwt,
  readEmployeeApplicationStatus
);
router.post(
  "/",
  // checkJwt,
  createEmployee
);
router.put(
  "/applicationStatus",
  // checkJwt,
  updateEmployeeApplicationStatus
);
router.put(
  "/",
  // checkJwt,
  updateEmployee
);
router.delete(
  "/",
  // checkJwt,
  deleteEmployee
);

router.put(
  "/role",
  // checkJwt,
  updateEmployeeRole
);

export default router;
