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
//Tomar carrito por id y sumarle un producto
// router.post("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   try {
//     let cart = await cartsManager.getOne(cid);
//     let data = cart.products;
//     if (cart) {
//       res.render("carts", { cart: data, idCart: cart.id });
//     } else {
//       res.status(404).json({ message: "Carrito no encontrado" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Error al obtener el carrito", data: err });
//   }
// });

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await cartsManager.getOne(cid);
    // console.log(cart);
    // cart.products.forEach((product) =>
    //   console.log("Probando producto", product)
    // );
    let productExistsInCart = cart.products.find(
      (dato) => dato.product.toString() == pid
    );
    // console.log("probando product exist", productExistsInCart);
    // !productExistsInCart
    //   ? cart.products.push({
    //       product: pid,
    //       quantity: 1,
    //     })
    //   : productExistsInCart.quantity++;
    if (productExistsInCart) {
      productExistsInCart.quantity++;
    } else {
      cart.product.push({
        product: pid,
        quantity: 1,
      });
    }
    await cart.save();
    // const result = await cartsManager.updateCart(cid, cart);
    // console.log(result);
    console.log("probando cart", cart);
    // const updateCart = await cartsManager.getOne(cid);
    // console.log(updateCart);
    res.json({ message: "Carrito actualizado", data: cart });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar el carrito", data: err });
  }
});

export default router;
