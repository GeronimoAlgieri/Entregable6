import { Router } from "express";
import cartProduct from "../dao/dbManager/cartProduct.manager.js";

const router = Router();
const CartProductManager = new cartProduct();

router.post("/", async (req, res) => {
  const { id, quantity } = req.body;
  let newCartProduct = {
    id: id,
    quantity: quantity,
  };
  try {
    const cart = await CartProductManager.saveCartProduct(newCartProduct);
    res.json({ message: "Producto agregado", data: cart });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al agregar el producto", data: err });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await CartProductManager.updateCartProduct(id, quantity);
    res.json({ message: "Producto actualizado", data: cart });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar", data: err });
  }
});

export default router;
