import { Router } from "express";
import {
  getOrders,
  getOrdersById,
  createOrders,
  resolveOrders,
} from "../controller/ticket.controller";

const router = Router();

router.get("/", getOrders);

router.get("/:id", getOrdersById);

router.post("/", createOrders);

router.put("/:id", resolveOrders);

export default router;
