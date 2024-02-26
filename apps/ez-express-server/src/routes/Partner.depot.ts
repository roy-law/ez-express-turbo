import express from "express";
import {
  createPartner,
  updatePartner,
  readPartner,
} from "../controllers/Partner";
import { checkJwt } from "../middleware/auth";

const router = express.Router();

router.post("/", checkJwt, createPartner);
router.get("/", checkJwt, readPartner);
router.put("/", checkJwt, updatePartner);

export default router;
