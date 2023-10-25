import CartsModel from "./models/carts.js";
import ProductsModel from "./models/products.js";

export class CartDaoMongo {
  async getCart() {
    try {
      return await CartsModel.find({});
    } catch (err) {
      console.log(err);
    }
  }

  async getCartById(id) {
    try {
      return await CartsModel.findById(id).lean({});
    } catch (err) {
      console.log(err);
    }
  }

  async saveCart() {
    try {
      return await CartsModel.create();
    } catch (err) {
      console.log(err);
    }
  }

  async saveProductCarts(id, pid) {
    console.log(id);
    try {
      let carrito = await CartsModel.findById(id);
      const productoEnCarrito = carrito.products.find(
        (product) => product.product.id == pid
      );
      if (carrito) {
        if (productoEnCarrito) {
          const product = await ProductsModel.findById(pid);
          product.quantity++;
          let result = await product.save();
          return "Success";
        } else {
          const product = await ProductsModel.findById(pid);
          product.quantity = 1;
          let result = await product.save();
          carrito.products.push({
            product: product.id,
          });
        }
        const result = await carrito.save();
        return "Success";
      } else {
        return "Cart not found";
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProductCart(cid, pid) {
    try {
      const carrito = await CartsModel.findById(cid);
      const producto = carrito.products.findIndex((p) => p.product.id == pid);
      if (producto !== -1) {
        carrito.products.splice(producto, 1);
        await carrito.save();
        return "success";
      } else {
        return "Carrito no encontrado";
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateCart(id, data) {
    try {
      const carrito = await CartsModel.findById(id);
      if (carrito) {
        carrito.products = data;
        carrito.save();
        return "success";
      } else {
        return "Carrito no encontrado";
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateQuantityProductCart(cid, pid, cantidad) {
    try {
      const carrito = await CartsModel.findById(cid);
      const prodInCart = carrito.products.findIndex((e) => e.product.id == pid);
      if (carrito) {
        if (prodInCart !== -1) {
          const product = await ProductsModel.findById(pid);
          product.quantity++;
          await product.save();
          return "success";
        } else {
          return "Producto no encontrado";
        }
      } else {
        return "Carrito no encontrado";
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProductsCart(cid) {
    try {
      const carrito = await CartsModel.findById(cid);
      if (carrito) {
        carrito.products = [];
        await carrito.save();
        return "success";
      } else {
        return "Carrito no encontrado";
      }
    } catch (err) {
      console.log(err);
    }
  }
}
