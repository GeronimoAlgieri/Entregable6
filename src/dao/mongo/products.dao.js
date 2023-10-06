import ProductsModel from "./models/products.js";

export class ProductDaoMongo {
  async getProducts(req, res) {
    try {
      const { limit = 10, page = 1, sort, query } = req.query;
      const results = await ProductsModel.paginate(
        query ? { category: query } : {},
        { limit, page, lean: true, sort: sort ? { price: 1 } : { price: -1 } }
      );
      let prevLink = results.hasPrevPage
        ? `http://localhost:8080/api/products/?page=${
            +page - 1
          }&limit=${limit}&query=${query}&sort=${sort}`
        : null;
      let nextLink = results.hasNextPage
        ? `http://localhost:8080/api/products/?page=${
            +page + 1
          }&limit=${limit}&query=${query}&sort=${sort}`
        : null;
      results.prevLink = prevLink;
      results.nextLink = nextLink;
      return results;
      // return await ProductsModel.find();
    } catch (err) {
      console.log(err);
    }
  }

  async getProductById(id) {
    try {
      return await ProductsModel.findById(id);
    } catch (err) {
      console.log(err);
    }
  }

  async saveProduct(product) {
    try {
      let result = await ProductsModel.create(product);
      return "success";
    } catch (err) {
      console.log(err);
    }
  }

  async modifyProduct(product, id) {
    try {
      let result = await ProductsModel.findByIdAndUpdate(id, product);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(id) {
    try {
      let product = await ProductsModel.findById(id);
      if (product) {
        return await ProductsModel.findByIdAndDelet(id);
      } else {
        return "Producto no encontrado";
      }
    } catch (err) {
      console.log(err);
    }
  }

  async modifyProductStock(pid) {
    const product = await ProductsModel.findById(pid);
    product.stock -= prod.quantity;
    await product.save();
    return product;
  }
}
