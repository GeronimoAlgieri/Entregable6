import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  // category: {
  //   type: String,
  //   required: true,
  // },
  thumbnail: {
    type: Object,
    required: false,
  },
  quantity: {
    type: Number,
    require: true,
    default: 1,
  },
  owner: {
    type: String,
    default: "admin",
  },
});

productsSchema.plugin(mongoosePaginate);
const ProductsModel = mongoose.model(productsCollection, productsSchema);

export default ProductsModel;
