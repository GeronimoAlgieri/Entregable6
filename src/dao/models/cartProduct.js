import mongoose from "mongoose";

const cartProductCollection = "cartCollection";

const cartProductSchema = new mongoose.Schema({
  id: { type: String, require: true },
  quantity: { type: Number, require: true },
});

const CartProductModel = mongoose.model(
  cartProductCollection,
  cartProductSchema
);

export default CartProductModel;
