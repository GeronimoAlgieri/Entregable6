import ProductsModel from "../models/products.js";

export default class Product {
  getAll = async () => {
    let result = await ProductsModel.find().lean();
    return result;
  };

  getOne = async (id) => {
    let result = await ProductsModel.findById(id);
    return result;
  };

  saveProduct = async (producto) => {
    let result = await ProductsModel.create(producto);
    return result;
  };

  updateProduct = async (id, producto) => {
    let result = await ProductsModel.findByIdAndUpdate({ _id: id }, producto);
    return result;
  };

  deleteProduct = async (id) => {
    let result = await ProductsModel.findByIdAndDelete(id);
    return result;
  };
}
