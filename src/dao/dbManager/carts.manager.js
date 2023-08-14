import CartsModel from "../models/cart.js";

export default class Cart {
  getAll = async () => {
    let result = await CartsModel.find().lean();
    return result;
  };

  getOne = async (id) => {
    let result = await CartsModel.findById(id).lean();
    return result;
  };

  saveCart = async (cart) => {
    let result = await CartsModel.create(cart);
    return result;
  };

  updateCart = async (id, cart) => {
    let result = await CartsModel.updateOne({ _id: id }, cart);
    return result;
  };
}
