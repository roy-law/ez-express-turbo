import express from "express";
import * as controller from "../controllers/Driver";
import { checkAdminScope, checkJwt } from "../middleware/auth";

const router = express.Router();

router.post("/", checkJwt, checkAdminScope, controller.createDriver);
router.get("/all", checkJwt, checkAdminScope, controller.readAllDrivers);

export = router;
