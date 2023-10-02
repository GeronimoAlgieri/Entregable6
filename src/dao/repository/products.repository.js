import { productsDTO } from "../DTO/products.dto.js";

export class productRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getProducts(req, res) {
    return await this.dao.productsDTO.getProducts(req, res);
  }

  async getProductById(id) {
    return await this.dao.productsDTO.getProductById(id);
  }

  async saveProduct(product) {
    const result = new productsDTO(product);
    return await this.dao.saveProduct(result);
  }

  async modifyProduct(pid, product) {
    const result = new productsDTO(product);
    result._id = !isNaN(pid) ? +pid : pid;
    return await this.dao.modifyProduct(pid, productsDTO);
  }

  async deleteProduct(pid) {
    return await this.dao.deleteProduct(pid);
  }

  async modifyProductStock(pid) {
    return await this.dao.modifyProductStock(pid);
  }
}
