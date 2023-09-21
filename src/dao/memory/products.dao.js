export default class productDao {
  constructor() {
    this.prod = [];
  }

  getProducts(res, req) {
    return this.prod;
  }

  getProductById(id) {
    return this.prod.find((e) => e.id == id);
  }

  saveProduct(producto) {
    this.prod.push(producto);
    this.prod.forEach((e) => {
      e.id = this.prod.indexOf(e) + 1;
    });
    return "Producto guardado";
  }

  modifyProduct(product, id) {
    let producto = this.prod.findIndex((e) => e.id == id);
    if (producto == -1) return "Producto no encontrado";
    this.prod[producto] = product;
    return "success";
  }

  deleteProduct(id) {
    let product = this.prod.find((e) => e.id == id);
    if (product) {
      let producto = this.prod.indexOf(product);
      this.prod.splice(producto, 1);
      this.prod.forEach((p) => {
        p.id = this.prod.indexOf(p) + 1;
      });
      return "success";
    } else {
      return "Producto no encontrado";
    }
  }
}
