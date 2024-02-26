import express from "express";
import * as controllers from "../controllers/Partner";
import { checkAdminScope, checkJwt } from "../middleware/auth";

const router = express.Router();

router.get("/partners", checkJwt, checkAdminScope, controllers.readPartners);

export default router;
