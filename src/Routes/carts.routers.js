import { Router } from "express";
import Cart from "../dao/dbManager/carts.manager.js";
import CartsModel from "../dao/models/carts.js";

const router = Router();
const cartsManager = new Cart();

//Crear carrito
router.post("/", async (req, res) => {
  try {
    const carts = await cartsManager.createCart();
    console.log(carts);
    res.json({ message: "success", cart: carts });
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el carrito", data: err });
  }
});
//Tomar carrito por id
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  let result = await cartsManager.getOne(cid);
  return res.json({ message: "Carrito seleccionado", data: result });
});

// Elimina un solo producto del carrito
router.delete("/:cid/product/:api", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const result = await cartsManager.removeFromCart(cid, pid);
    res.json({ message: "Producto eliminado correctamente", data: result });
  } catch (err) {
    res.json({ message: "Error al eliminar un producto" });
  }
});

// Agrega un producto y aumento el quantity
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const result = await cartsManager.saveProductToCart(cid, pid);
    res.json({ message: "Carrito actualizado", data: result });
  } catch (err) {
    res.json({ message: "Error al actualizar el carrito", error: err });
  }
});

// Elimina todo el carrito
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsManager.deleteCart(cid);
    console.log(cart);
    cart.products = [];
    await cart.save();
    res.status(200).json({ message: "Carrito vacio", cart: cart });
  } catch (err) {
    res.status(500).json({
      message: "Error al eliminar los productos del carrito",
      data: err,
    });
  }
});

// Actualizar solo la cantidad de un producto en el carrito
router.put("/:cid/product/:pid", async (req, res) => {
  const { cid, pid, quantity } = req.params;
  try {
    const cart = await cartsManager.getOne(cid);
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }
    const productUpdate = await cartsManager.updateProductoInCart(
      cid,
      pid,
      quantity
    );
    console.log(productUpdate);
    await cart.save();
    res
      .status(200)
      .json({ message: "Product quantity updated successfully", cart: cart });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating product quantity", error: err });
  }
});

export default router;
