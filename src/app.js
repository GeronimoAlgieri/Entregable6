import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
import productRouter from "./Routes/products.routers.js";
import carritoRouter from "./Routes/carts.routers.js";
import chatRouter from "./Routes/chat.routers.js";
import cartProductRouter from "./Routes/cartsProducts.routers.js";
import Message from "./dao/dbManager/messages.manager.js";

dotenv.config();

const messageManager = new Message();
const app = express();
const PORT = process.env.PORT || "8080";
const MONGO_URI = process.env.MONGO_URI;
const connection = mongoose.connect(MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use("/api/products", productRouter);
app.use("/carts", carritoRouter);
app.use("/chat", chatRouter);
app.use("/cart", cartProductRouter);

const server = app.listen(PORT, () => {
  console.log("Escuchando desde el puerto " + PORT);
});

server.on("error", (err) => {
  console.log(err);
});

const ioServer = new Server(server);

ioServer.on("connection", async (socket) => {
  console.log("Nueva conexión establecida");
  socket.on("new-user", (data) => {
    socket.user = data.user;
    socket.id = data.id;
    ioServer.emit("new-user-connected", {
      user: socket.user,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  socket.on("message", async (data) => {
    try {
      await messageManager.saveMessage(data);
      let messages = await messageManager.getAll();
      ioServer.emit("messageLogs", messages);
    } catch (err) {
      console.log(err);
    }
  });
});
