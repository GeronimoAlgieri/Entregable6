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

  deleteCart = async (id) => {
    let result = await CartsModel.findByIdAndDelete(id);
    return result;
  };

  async saveProductToCart(cart_id, prod_id) {
    try {
      const cart = await CartsModel.findOne({ _id: cart_id });
      const existProduct = cart.products.find(
        (elem) => elem.product.toString() === prod_id
      );
      if (existProduct) {
        existProduct.quantity++;
      } else {
        console.log("el producto no existe");
        cart.products.push({
          product: prod_id,
          quantity: 1,
        });
      }
      await cart.save();
      return cart;
    } catch (err) {
      console.log("Erro en addproduct", err);
      return err;
    }
  }

  async updateProductoInCart(cid, pid, newQuantity) {
    const updatedCart = await CartsModel.findOneAndUpdate(
      { _id: cid, "products._id": pid },
      { $set: { "products.$.quantity": newQuantity } },
      { new: true }
    );

    return updatedCart;
  }
}
