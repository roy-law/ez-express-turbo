import express from "express";
import controller from "../controllers/Depot";
import { checkAdminScope, checkJwt } from "../middleware/auth";

const router = express.Router();

router.post("/", checkJwt, controller.createDepot);
router.put("/", checkJwt, controller.updateDepot);
router.get("/", checkJwt, controller.readDepot);
router.get("/all", checkJwt, checkAdminScope, controller.readAll);

export = router;
