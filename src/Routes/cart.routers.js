import { Router } from "express";
import Cart from "../dao/dbManager/carts.manager.js";

const router = Router();
const cartsManager = new Cart();
//Crear carrito
router.post("/", async (req, res) => {
  try {
    const carts = await cartsManager.getAll();
    res.json({ message: "success", cart: carts });
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el carrito", data: err });
  }
});
//Tomar carrito por id
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  let result = await CartsModel.findById(cid);
  return res.json({ message: "Carrito seleccionado", data: result });
});
//Tomar carrito por id y sumarle un producto
router.post("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    let cart = await cartsManager.getOne(cid);
    let data = cart.products;
    if (cart) {
      res.render("carts", { cart: data, idCart: cart.id });
    } else {
      res.status(404).json({ message: "Carrito no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el carrito", data: err });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await cartsManager.getOne(cid);
    cart.products.forEach((product) => console.log(product));
    let productExistsInCart = cart.products.findIndex(
      (dato) => dato.product == pid
    );
    productExistsInCart == -1
      ? cart.products.push({
          product: pid,
          quantity: 1,
        })
      : (cart.products[productExistsInCart].quantity =
          cart.products[productExistsInCart.quantity + 1]);
    const result = await cartsManager.updateCart(cid, cart);
    const updateCart = await cartsManager.getOne(cid);
    console.log(updateCart);
    res.json({ message: "Carrito actualizado", data: updateCart });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar el carrito", data: err });
  }
});

export default router;
