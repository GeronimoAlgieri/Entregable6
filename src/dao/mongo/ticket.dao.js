import OrderModel from "./models/ticket.js";

export default class OrderDao {
  async getOrder() {
    try {
      const result = await OrderModel.find();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getOrderById(id) {
    try {
      const result = await OrderModel.findById(id);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async createOrder(order) {
    try {
      const result = await OrderModel.create(order);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async resolveOrder(id, order) {
    try {
      const result = await OrderModel.findByIdAndUpdate(id, order);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}
