import express from "express";
import * as controller from "../controllers/BusinessParcel";
import { checkCustomerScope, checkJwt } from "../middleware/auth";

const router = express.Router();

router.get(
  "/parcels",
  checkJwt,
  checkCustomerScope,
  controller.readBusinessParcelsFromDepot
);

export default router;
