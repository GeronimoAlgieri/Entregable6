import User from "../dao/mongo/user.dao.js";
import Order from "../dao/mongo/ticket.dao.js";
import Cart from "../dao/mongo/carts.dao.js";

const orderService = new Order();
const userService = new User();
const cartService = new Cart();

async function getOrders(req, res) {
  try {
    const result = await orderService.getOrder();
    res.json({ status: "success", result });
  } catch (err) {
    console.log(err);
  }
}

async function getOrdersById(req, res) {
  try {
    const { oid } = req.params;
    const result = await orderService.getOrderById(oid);
    res.json({ status: "success", result });
  } catch (err) {
    console.log(err);
  }
}

async function createOrders(req, res) {
  try {
    const { user, cart, products } = req.body;
    const resultUser = await userService.getUserById(user);
    const resultCart = await cartService.getCartById(cart);
    const actualOrder = await resultCart.products.filter((product) =>
      products.includes(product.id)
    );
    const sum = actualOrder.reduce((acc, prev) => {
      acc += prev.price;
      return acc;
    }, 0);
    const orderNumber = Date.now() + Math.floor(Math.random() * 10000 + 1);
    const order = {
      number: orderNumber,
      cart,
      user,
      status: "pending",
      products: actualOrder.map((product) => product.id),
      totalPrice: sum,
    };
    console.log(order);
    const orderResult = await orderService.createOrder(order);
    resultUser.orders.push(orderResult.id);
    await userService.updateUser(user, resultUser);
    res.send({ status: "success", result: orderResult });
  } catch (err) {
    console.log(err);
  }
}

async function resolveOrders(req, res) {
  try {
    const { resolve } = req.query;
    const order = await orderService.resolveOrder(req.params.oid);
    order.status = resolve;
    await orderService.updateOrder(req.params.oid, {
      ...order,
    });
    res.json({ status: "success", message: "Orden Resuelta" });
  } catch (err) {
    console.log(err);
  }
}

export { getOrders, getOrdersById, createOrders, resolveOrders };
