import { Router, response } from "express";
import Message from "../dao/dbManager/messages.manager.js";

const router = Router();
const messageManager = new Message();

router.get("/", async (req, res) => {
  try {
    const resp = await messageManager.getAll();
    res.render("chat", {
      style: "chatView.css",
      title: "Chat",
      data: resp,
    });
  } catch (err) {
    res.status(500).json({ message: "Error al iniciar el chat", data: err });
  }
});

export default router;
