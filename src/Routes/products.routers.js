import { Router } from "express";
import {
  deleteProducto,
  getProductos,
  getProductsById,
  modifyProducto,
  saveProducto,
  modifyProductStock,
  createProducts,
} from "../controller/products.controller.js";
import { authAdmin, authUser } from "../utils/authToken.js";

const router = Router();

//Tomar productos
router.get("/", authUser, getProductos);

//Modificar un producto
router.get("/:pid", modifyProducto);

// Tomar producto por ID
router.post("/", getProductsById);

//Agregar un producto
router.put("/:pid", saveProducto);

//Borrar un producto
router.delete("/:pid", deleteProducto);

// Modificar el stock del producto
router.put("/stock/:pid", modifyProductStock);

router.post("/createproduct", authAdmin, createProducts);

export default router;
