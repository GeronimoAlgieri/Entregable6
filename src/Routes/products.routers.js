import { Router } from "express";
import {
  deleteProducto,
  getProductos,
  getProductsById,
  modifyProducto,
  saveProducto,
} from "../controller/products.controller.js";

const router = Router();

//Tomar productos
router.get("/", getProductos);
//Modificar un producto
router.get("/:pid", modifyProducto);
// Tomar producto por ID
router.post("/", getProductsById);
//Agregar un producto
router.put("/:pid", saveProducto);
//Borrar un producto
router.delete("/:pid", deleteProducto);

export default router;
