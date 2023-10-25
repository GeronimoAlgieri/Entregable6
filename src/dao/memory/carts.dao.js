import { PRODUCT_DAO } from "../index.js";

export class CartDaoMemory {
  constructor() {
    this.carrito = [];
  }

  getCart() {
    return this.carrito;
  }

  async getCartById(cid) {
    const productPromises = this.carrito
      .find((c) => c.id === +cid)
      .products.map(async (p) => {
        const product = await PRODUCT_DAO.getProductById(p.product);
        return { product: product };
      });

    const products = await Promise.all(productPromises);

    return { id: this.carrito.find((c) => c.id === +cid).id, products };
  }

  // getCartById(cid) {
  //   return this.carrito.find((e) => e.id == cid);
  // }

  saveCart(cart) {
    this.carrito.push(cart);
    this.carrito.forEach((e) => {
      e.id = this.carrito.indexOf(e) + 1;
    });
    return "success";
  }

  saveProductCart(id, pid) {
    const carrito = this.carrito.find((c) => c.id == id);
    const product = PRODUCT_DAO.getProductById(pid);
    if (carrito) {
      if (carrito.products.some((p) => p.id == product.id)) {
        const productoEnCarrito = carrito.products.find(
          (p) => p.id == product.id
        );
        productoEnCarrito.quantity++;
      } else {
        product.quantity = 1;
        carrito.products.push(product);
      }
      return "Success";
    } else {
      return "Carrito no encontrado";
    }
  }

  deleteProduct(id, pid) {
    const carrito = this.carrito.find((e) => e.id == id);
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
