import CartProductModel from "../models/cartProduct.js";

export default class cartProduct {
  saveCartProduct = async (cartProduct) => {
    const result = await CartProductModel.create(cartProduct);
    return result;
  };

  updateCartProduct = async (id, product) => {
    const result = await CartProductModel.updateOne(id, product);
    return result;
  };
}
