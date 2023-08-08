import express from "express";
import handlebars from "express-handlebars";
import Viewrouter from "./Routes/view.routers.js";
import { Server } from "socket.io";
import path from "path";
import { __dirname } from "./utils.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import ProductsModel from "./dao/models/products.js";
import Productosrouter from "./Routes/productos.routers.js";
import Carritorouter from "./Routes/cart.routers.js";
import Chatrouter from "./Routes/chat.routers.js";
import MessagesModel from "./dao/models/message.js";

dotenv.config();
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

app.use("/productos", Productosrouter);
app.use("/carrito", Carritorouter);
app.use("/", Viewrouter);
app.use("/chat", Chatrouter);

const server = app.listen(PORT, () => {
  console.log("Escuchando desde el puerto " + PORT);
});

server.on("error", (err) => {
  console.log(err);
});

const ioServer = new Server(server);

ioServer.on("connection", async (socket) => {
  console.log("Nueva conexión establecida");

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  socket.on("new-product", async (data) => {
    let title = data.title;
    let description = data.description;
    let code = data.code;
    let price = +data.price;
    let stock = +data.stock;
    let category = data.category;
    let thumbnail = data.thumbnail;
    console.log(title, description, code, price, stock, category, thumbnail);
    console.log("Producto agregado correctamente");
  });

  socket.on("delete-product", async (data) => {
    let id = data;
    let result = await ProductsModel.findByIdAndDelete(id);
    console.log("Producto eliminado", result);
  });

  const productos = await ProductsModel.find({}).lean();
  socket.emit("update-products", productos);

  socket.on("guardar-mensaje", (data) => {
    MessagesModel.insertMany([data]);
  });

  const mensajes = await MessagesModel.find({}).lean();
  socket.emit("enviar-mensajes", mensajes);
  socket.on("Nuevos-mensajes", (data) => {
    console.log(data + " nuevos mensajes");
  });
});
