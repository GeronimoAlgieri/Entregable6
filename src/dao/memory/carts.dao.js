import { PRODUCT_DAO } from "../index.js";

export default class carritoDao {
  constructor() {
    this.carrito = [];
  }

  getCart() {
    return this.carrito;
  }

  getCartById(id) {
    return this.carrito.find((e) => e.id == id);
  }

  saveCart(cart) {
    this.carrito.push(cart);
    this.carrito.forEach((e) => {
      e.id = this.carrito.indexOf(e) + 1;
    });
    return "success";
  }

  saveProductCart(id, pid) {
    const carrito = this.carrito.find((e) => e.id == id);
    const prod = PRODUCT_DAO.getProductById(pid);
    if (carrito) {
      if (carrito.prod.some((e) => e.id == prod.id)) {
        const prodInCart = carrito.prod.find((p) => pid == pid);
        prodInCart.quantity++;
      } else {
        product.quantity = 1;
        carrito.prod.push(product);
      }
      return "success";
    } else {
      return "Carrito no encontrado";
    }
  }

  deleteProduct(id, pid) {
    const carrito = this.carrito.find((e) => e.id == pid);
    if (carrito) {
      const producto = carrito.prod.findIndex((p) => p.id == pid);
      if (producto === -1) return "Producto no encontrado";
      carrito.prod.splice(producto, 1);
      return "success";
    } else {
      return "Carrito no encontrado";
    }
  }

  updateCart(id, data) {
    const carrito = this.carrito.find((e) => e.id == id);
    if (carrito) {
      carrito.prod = data;
      return "success";
    } else {
      return "Carrito no encontrado";
    }
  }

  deleteProducts(cid) {
    const carrito = this.carrito.find((e) => e.id == cid);
    if (carrito) {
      carrito.prod = [];
      return "success";
    } else {
      return "Carrito no encontrado";
    }
  }
}
