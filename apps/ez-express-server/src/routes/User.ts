import express from "express";
import controller from "../controllers/User";
import { checkJwt } from "../middleware/auth";

const router = express.Router();

router.post("/", checkJwt, controller.createUser);
router.get("/", checkJwt, controller.readUser);
router.put("/", checkJwt, controller.updateUser);
router.get("/isEmailExist", checkJwt, controller.checkIsUserUniqueByEmail);

export default router;
