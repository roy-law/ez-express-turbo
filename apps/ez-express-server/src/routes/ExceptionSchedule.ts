import express from "express";
import * as controller from "../controllers/ExceptionSchedule";
import { checkAdminOrDriver, checkJwt } from "../middleware/auth";

const router = express.Router();

router.post(
  "/",
  checkJwt,
  checkAdminOrDriver,
  controller.createExceptionSchedule
);
router.get("/", checkJwt, checkAdminOrDriver, controller.readExceptionSchedule);
router.put(
  "/",
  checkJwt,
  checkAdminOrDriver,
  controller.updateExceptionSchedule
);

export default router;
