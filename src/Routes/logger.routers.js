import Router from "express";
import { getLogger } from "../controller/logger.controller.js";

const router = Router();

router.get("/", getLogger);

export default router;
