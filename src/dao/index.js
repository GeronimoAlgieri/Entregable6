// import { configuracion } from "../config.js";
// configuracion();

// Mongo
import { CartDaoMongo } from "./mongo/carts.dao.js";
import { ProductDaoMongo } from "./mongo/products.dao.js";
import { TicketDaoMongo } from "./mongo/ticket.dao.js";
import { UserDaoMongo } from "./mongo/user.dao.js";

// Memory
import { CartDaoMemory } from "./memory/carts.dao.js";
import { ProductDaoMemory } from "./memory/products.dao.js";
import { UserDaoMemory } from "./memory/user.dao.js";
import { TicketDaoMemory } from "./memory/ticket.dao.js";

export const CART_DAO =
  process.env.PERSISTENCE === "MONGO"
    ? new CartDaoMongo()
    : new CartDaoMemory();

export const PRODUCT_DAO =
  process.env.PERSISTENCE === "MONGO"
    ? new ProductDaoMongo()
    : new ProductDaoMemory();

export const TICKET_DAO =
  process.env.PERSISTENCE === "MONGO"
    ? new TicketDaoMongo()
    : new TicketDaoMemory();

export const USER_DAO =
  process.env.PERSISTENCE === "MONGO"
    ? new UserDaoMongo()
    : new UserDaoMemory();
