import { Router } from "express";
import {
  creatCart,
  deleteProductCarrito,
  deleteProductsCarrito,
  getCarritoById,
  saveProductInCart,
  updateQuantityProductCarrito,
  updateCarrito,
} from "../controller/carts.controller.js";

const router = Router();

//Crear carrito
router.post("/", creatCart);

//Tomar carrito por id
router.get("/:cid", getCarritoById);

// Elimina un solo producto del carrito
router.delete("/:cid/product/:api", deleteProductCarrito);

// Tomar carrito por ID y sumar un producto
router.post("/:cid/product/:pid", saveProductInCart);

// Elimina todo el carrito
router.delete("/:cid", deleteProductsCarrito);

//Actualizar el carrito con un arreglo de productos especificado
router.put("/:cid", updateCarrito);

//Actualizar cantidad de ejemplares del producto seleccionado, del carrito especificado
router.put("/:cid/product/:pid", updateQuantityProductCarrito);

export default router;
