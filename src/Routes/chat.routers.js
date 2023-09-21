import { Router } from "express";
import { getMessages } from "../controller/chat.controller.js";

const router = Router();

router.get("/", getMessages);

export default router;
