import CartsModel from "../models/carts.js";

export default class Cart {
  getAll = async () => {
    let result = await CartsModel.find().lean();
    return result;
  };

  getOne = async (id) => {
    let result = await CartsModel.findOne({ _id: id }).lean();
    return result;
  };

  createCart = async () => {
    let result = await CartsModel.create({});
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
