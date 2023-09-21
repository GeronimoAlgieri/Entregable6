import cartMemory from "./memory/carts.dao.js";
import cartMongo from "./mongo/carts.dao.js";
import productMemory from "./memory/products.dao.js";
import productMongo from "./mongo/products.dao.js";

export const CART_DAO =
  process.env.PERSISTENCE === "MONGO" ? new cartMemory() : new cartMongo();

export const PRODUCT_DAO =
  process.env.PERSISTENCE === "MONGO"
    ? new productMemory()
    : new productMongo();
