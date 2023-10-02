import { Router } from "express";
import { showCart } from "../controller/view.controller.js";

const router = Router();

router.get("/carts/:cid", showCart);

export default router;
