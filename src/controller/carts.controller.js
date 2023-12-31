import { CART_DAO } from "../dao/index.js";
import { TICKET_DAO } from "../dao/index.js";
import CustomError from "../service/CustomError.js";
import Errors from "../service/enum.js";
import { addLogger } from "../utils/logger.js";
import CartsModel from "../dao/mongo/models/carts.js";

async function creatCart(req, res) {
  // req.logger = addLogger;
  const carrito = {
    products: [],
  };
  try {
    let result = await CartsModel.create(carrito);
    console.log("console.log de carrito", result);
    // res.json({ message: "Carrito creado", result });
  } catch (err) {
    // const error = CustomError.generateError({
    //   name: "Error en el carrito",
    //   message: "Error al crear el carrito",
    //   cause: err,
    //   code: Errors.DATABASE_ERROR,
    // });
    console.log(err);
    // req.logger.error(
    //   "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    // );
    // console.log("Error en el carrito", error);
  }
}

async function getCarritoById(req, res) {
  req.logger = addLogger;
  try {
    const { cid } = req.params;
    let result = await CART_DAO.getCartById(cid);
    res.json({ message: "Carrito seleccinado", result });
  } catch (err) {
    const error = CustomError.generateError({
      name: "Error en el carrito",
      message: "Carrito no encontrado",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    console.log("Error en el carrito", error);
  }
}

async function saveProductInCart(req, res) {
  req.logger = addLogger;
  try {
    const { cid, pid } = req.params;
    const result = await CART_DAO.saveProductCart(cid, pid);
    res.json({ status: "success", message: "OK", result });
  } catch (err) {
    const error = CustomError.generateError({
      name: "Error en el carrito",
      message: "Error al guardar un producto en el carrito",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    console.log("Error en el carrito", error);
  }
}

async function updateCarrito(req, res) {
  req.logger = addLogger;
  try {
    const { cid } = req.params;
    const { data } = req.body;
    const result = await CART_DAO.updateCart(cid, data);
    res.status(201).json({ message: "Carrito actualizado", result });
  } catch (err) {
    const error = CustomError.generateError({
      name: "Error en el carrito",
      message: "Error al actualizar el carrito",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    console.log("Error en el carrito", error);
  }
}

async function updateQuantityProductCarrito(req, res) {
  req.logger = addLogger;
  try {
    const { cid, pid } = req.params;
    const { cantidad } = req.body;
    const result = await CART_DAO.updateQuantityProductCart(cid, pid, cantidad);
    res.send(result);
  } catch (err) {
    const error = CustomError.generateError({
      name: "Error en el carrito",
      message: "Error al actualizar  el carrito",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    console.log("Error en el carrito", error);
  }
}

async function deleteProductsCarrito(req, res) {
  req.logger = addLogger;
  try {
    const { cid } = req.params;
    const result = await CART_DAO.deleteProductsCart(cid);
    res.json({ status: result, message: "OK" });
  } catch (err) {
    const error = CustomError.generateError({
      name: "Error en el carrito",
      message: "Error al eliminar todos los productos del carrito",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    console.log("Error en el carrito", error);
  }
}

async function deleteProductCarrito(req, res) {
  req.logger = addLogger;
  try {
    const { cid, pid } = req.params;
    const result = await CART_DAO.deleteProductCart(cid, pid);
    res.json({ status: result, message: "OK" });
  } catch (err) {
    const error = CustomError.generateError({
      name: "Error en el carrito",
      message: "Error al eliminar el producto del carrito",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    console.log("Error en el carrito", error);
  }
}

async function purchaseProduct(req, res) {
  req.logger = addLogger;
  const { total, email, code } = req.body;
  try {
    const ticket = {
      code,
      purchase_datetime: new Date(),
      amount: total,
      purchaser: email,
    };
    const result = TICKET_DAO.saveTicket(ticket);
    res.json({ message: "Success", result });
  } catch (err) {
    const error = CustomError.generateError({
      name: "Error en el carrito",
      message: "Error al finalizar el carrito",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    console.log("Error en el carrito", error);
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
  purchaseProduct,
};
