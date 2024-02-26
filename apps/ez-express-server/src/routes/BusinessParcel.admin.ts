import express from "express";
import * as controller from "../controllers/BusinessParcel";
import { checkAdminScope, checkJwt } from "../middleware/auth";

const router = express.Router();

router.get(
  "/parcels",
  checkJwt,
  checkAdminScope,
  controller.readBusinessParcelsFromAdmin
);

export default router;
