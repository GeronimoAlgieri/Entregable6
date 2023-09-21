import CartsModel from "./models/carts.js";
import ProductsModel from "./models/products.js";

export default class CartDao {
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

  async saveCart(cart) {
    try {
      return await CartsModel.create(cart);
    } catch (err) {
      console.log(err);
    }
  }

  async saveProductCart(id, pid) {
    try {
      let carrito = await CartsModel.findById(id);
      const prodInCart = carrito.prod.find((product) => product.id == pid);
      if (carrito) {
        if (prodInCart) {
          const product = await ProductsModel.findById(pid);
          product.quantity++;
          let result = await product.save();
          return "success";
        } else {
          const product = await ProductsModel.findById(pid);
          product.quantity++;
          let result = await ProductsModel.findById(pid);
          product.quantity.push({
            product: product.id,
          });
        }
        const result = await carrito.save();
        return "success";
      } else {
        return "Carrito no encontrado";
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProductCart(cid, pid) {
    try {
      const carrito = await CartsModel.findById(cid);
      const producto = carrito.prod.findIndex((p) => p.product.id == pid);
      if (producto !== -1) {
        carrito.prod.splice(producto, 1);
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
        carrito.prod = data;
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
      const prodInCart = carrito.prod.findIndex((e) => e.product.id == pid);
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
        carrito.prod = [];
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
