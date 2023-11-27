import express from "express";
import * as controller from "../controllers/Parcel";
import {
  checkAdminOrCustomer,
  checkAdminOrDriverOrCustomer,
  checkAdminScope,
  checkCustomerScope,
  checkJwt,
} from "../middleware/auth";

const router = express.Router();

router.post("/", checkJwt, checkCustomerScope, controller.createParcel);
router.put("/", checkJwt, checkCustomerScope, controller.updateParcel);
router.get(
  "/cday",
  checkJwt,
  checkCustomerScope,
  controller.readCustomerDayParcels
);
//** @deprecated */
// router.get("/today", checkJwt, controller.readTodayParcels);

router.get(
  "/dayRange",
  checkJwt,
  checkAdminOrCustomer,
  controller.readDayRangeParcels
);
router.get("/aday", checkJwt, checkAdminScope, controller.readAdminDayParcels);
router.get(
  "/exception",
  checkJwt,
  checkAdminScope,
  controller.readExceptionParcels
);
router.get(
  "/atoday",
  checkJwt,
  checkAdminScope,
  controller.readAdminTodayParcels
);
router.get("/tracking/:trackingNumber", controller.readByTrackingNumber);
router.patch(
  "/status/:parcelId",
  checkJwt,
  checkAdminOrDriverOrCustomer,
  controller.updatePackageStatus
);
router.patch(
  "/geo/:parcelId",
  checkJwt,
  checkAdminScope,
  controller.updateParcelGeo
);
router.get("/:parcelId", checkJwt, checkCustomerScope, controller.readParcel);

export = router;
