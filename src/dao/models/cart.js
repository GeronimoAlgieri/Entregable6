import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    default: [],
  },
});

cartsSchema.pre("find", function () {
  this.populate("products.product");
});

const CartsModel = mongoose.model(cartsCollection, cartsSchema);

export default CartsModel;
