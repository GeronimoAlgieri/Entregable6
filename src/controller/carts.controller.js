import { CART_DAO } from "../dao/index.js";

async function creatCart(req, res) {
  const carrito = {
    products: [],
  };
  let result = await CART_DAO.saveCart(carrito);
  res.json({ message: "Carrito creado", result });
}

async function getCarritoById(req, res) {
  try {
    const { cid } = req.params;
    let result = await CART_DAO.getCartById(cid);
    res.json({ message: "Carrito seleccinado", result });
  } catch (err) {
    console.log(err);
  }
}

async function saveProductInCart(req, res) {
  try {
    const { cid, pid } = req.params;
    const result = await CART_DAO.saveProductCart(cid, pid);
    res.json({ status: "success", message: "OK", result });
  } catch (err) {
    console.log(err);
  }
}

async function updateCarrito(req, res) {
  try {
    const { cid } = req.params;
    const { data } = req.body;
    const result = await CART_DAO.updateCart(cid, data);
    res.status(201).json({ message: "Carrito actualizado", result });
  } catch (err) {
    console.log(err);
  }
}

async function updateQuantityProductCarrito(req, res) {
  try {
    const { cid, pid } = req.params;
    const { cantidad } = req.body;
    const result = await CART_DAO.updateQuantityProductCart(cid, pid, cantidad);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
}

async function deleteProductsCarrito(req, res) {
  try {
    const { cid } = req.params;
    const result = await CART_DAO.deleteProductsCart(cid);
    res.json({ status: result, message: "OK" });
  } catch (err) {
    console.log(err);
  }
}

async function deleteProductCarrito(req, res) {
  try {
    const { cid, pid } = req.params;
    const result = await CART_DAO.deleteProductCart(cid, pid);
    res.json({ status: result, message: "OK" });
  } catch (err) {
    console.log(err);
  }
}

export {
  creatCart,
  getCarritoById,
  saveProductInCart,
  updateCarrito,
  updateQuantityProductCarrito,
  deleteProductsCarrito,
  deleteProductCarrito,
};
