import express from "express";
import * as controller from "../controllers/PartnerDepot";
import { checkCustomerScope, checkJwt } from "../middleware/auth";

const router = express.Router();

router.post("/", checkJwt, checkCustomerScope, controller.createPartnerDepot);
router.get(
  "/:partnerDepotId",
  checkJwt,
  checkCustomerScope,
  controller.readPartnerDepot
);
router.put(
  "/:partnerDepotId",
  checkJwt,
  checkCustomerScope,
  controller.updatePartnerDepot
);

export default router;
