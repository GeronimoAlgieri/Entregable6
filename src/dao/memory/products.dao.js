export default class productDao {
  constructor() {
    this.products = [];
  }

  getProducts(res, req) {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((e) => e.id == id);
  }

  saveProduct(producto) {
    this.products.push(producto);
    this.products.forEach((e) => {
      e.id = this.products.indexOf(e) + 1;
    });
    return "Producto guardado";
  }

  modifyProduct(product, id) {
    let producto = this.products.findIndex((e) => e.id == id);
    if (producto == -1) return "Producto no encontrado";
    this.products[producto] = product;
    return "success";
  }

  deleteProduct(id) {
    let product = this.products.find((e) => e.id == id);
    if (product) {
      let producto = this.products.indexOf(product);
      this.products.splice(producto, 1);
      this.products.forEach((p) => {
        p.id = this.products.indexOf(p) + 1;
      });
      return "success";
    } else {
      return "Producto no encontrado";
    }
  }
}
