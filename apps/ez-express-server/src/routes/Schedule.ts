import express from "express";
import controller from "../controllers/Schedule";
import { checkAdminOrDriver, checkJwt } from "../middleware/auth";

const router = express.Router();

router.post("/", checkJwt, checkAdminOrDriver, controller.createSchedule);
router.get("/", checkJwt, checkAdminOrDriver, controller.readSchedule);
router.put("/", checkJwt, checkAdminOrDriver, controller.updateSchedule);

export = router;
