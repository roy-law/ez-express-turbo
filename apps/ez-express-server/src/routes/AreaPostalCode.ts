import express from "express";
import * as controller from "../controllers/AreaPostalCode";
import { checkAdminScope, checkJwt } from "../middleware/auth";

const router = express.Router();

router.post("/", controller.createAreaPostalCode);
router.put("/", controller.updateAreaPostalCode);
router.get("/", controller.getAreaPostalCode);
// router.post("/", checkJwt, controller.createAreaPostalCode);
// router.put("/", checkJwt, controller.updateAreaPostalCode);
// router.get("/", checkJwt, controller.getAreaPostalCode);

export = router;
