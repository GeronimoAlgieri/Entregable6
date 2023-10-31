import { productsDTO } from "../DTO/products.dto.js";
import { ProductDaoMongo } from "../mongo/products.dao.js";

export class ProductRepository {
  constructor() {
    this.productDao = new ProductDaoMongo();
  }

  async getProducts(req, res) {
    return await this.productDao.getProducts(req, res);
  }

  async getProductById(id) {
    return await this.productDao.getProductById(id);
  }

  async saveProduct(product) {
    const result = new ProductDaoMongo(product);
    return await this.productDao.saveProduct(result);
  }

  async modifyProduct(pid, product) {
    const result = new ProductDaoMongo(product);
    result._id = !isNaN(pid) ? +pid : pid;
    return await this.productDao.modifyProduct(pid, productsDTO);
  }

  async deleteProduct(pid) {
    return await this.productDao.deleteProduct(pid);
  }

  async modifyProductStock(pid) {
    return await this.productDao.modifyProductStock(pid);
  }
}
