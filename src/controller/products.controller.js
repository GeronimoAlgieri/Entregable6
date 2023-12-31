import ProductsModel from "../dao/mongo/models/products.js";
import { ProductRepository } from "../dao/repository/products.repository.js";
import CustomError from "../service/CustomError.js";
import Errors from "../service/enum.js";
import { generateUserErrorInfo } from "../service/info.js";
import { addLogger } from "../utils/logger.js";

const productService = new ProductRepository();

async function getProductos(req, res) {
  req.logger = addLogger;
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } =
      await ProductsModel.paginate(query ? { category: query } : {}, {
        limit,
        page,
        lean: true,
        sort: sort ? { price: 1 } : { price: -1 },
      });
    res.render("products", {
      title: "Productos",
      products: docs,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      limit,
      sort,
      query,
    });
    // const products = await PRODUCT_DAO.getProducts();
    // res.render("products", { products });
  } catch (err) {
    console.log(err);
    const error = CustomError.generateError({
      name: "Error en los productos",
      message: "Error al obtener los productos",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    console.log("Error en los productos", error);
  }
  // try {
  //   const products = await PRODUCT_DAO.getProducts();
  //   res.render("products", {
  //     title: "Productos",
  //     products,
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
}

async function getProductsById(req, res) {
  req.logger = addLogger;
  try {
    const { pid } = req.params;
    const result = await productService.getProductById(pid);
    res.json({ message: "Producto seleccionado", result: result });
  } catch (err) {
    const error = CustomError.generateError({
      name: "Error en los productos",
      message: "Error al obtener el producto",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    console.log("Error en los productos", error);
  }
}

async function saveProducto(req, res) {
  req.logger = addLogger;
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = req.body;
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category ||
      !thumbnail
    ) {
      res.status(500).json({ message: "Faltan datos" });
    } else {
      const productoNuevo = {
        title: title,
        description: description,
        code: code,
        price: +price,
        status: true,
        stock: +stock,
        // category: category,
        thumbnail: thumbnail,
        quantity: 1,
      };
      const result = await productService.saveProduct(productoNuevo);
      res.status(201).json({ message: "Producto guardado", result });
    }
  } catch (err) {
    const error = CustomError.generateError({
      name: "Error en los productos",
      message: "Types invalidos",
      cause: generateUserErrorInfo({
        title,
        description,
        code,
        price,
        stock,
        thumbnail,
      }),
      code: Errors.INCOMPLETE_DATA,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    console.log("Error en los productos", error);
  }
}

async function modifyProducto(req, res) {
  req.logger = addLogger;
  try {
    const { pid } = req.params;
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      // category,
      thumbnail,
    } = req.body;
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      // !category ||
      !thumbnail
    ) {
      return res.status(500).json({ message: "Faltan datos" });
    } else {
      const producto = {
        title: title,
        description: description,
        code: code,
        price: +price,
        status: true,
        stock: +stock,
        // category: category,
        thumbnail: thumbnail,
      };
      const data = await productService.modifyProduct(producto, pid);
      res.json({ message: "Producto modificado", data });
    }
  } catch (err) {
    const error = CustomError.generateError({
      name: "Error en los productos",
      message: "Types invalidos",
      cause: generateUserErrorInfo({
        title,
        description,
        code,
        price,
        stock,
        thumbnail,
      }),
      code: Errors.INCOMPLETE_DATA,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    console.log("Error en los productos", error);
  }
}

async function deleteProducto(req, res) {
  req.logger = addLogger;
  try {
    const { pid } = req.params;
    const result = await productService.deleteProduct(pid);
    res.json({ message: "Producto eliminado", result });
  } catch (err) {
    const error = CustomError.generateError({
      name: "Error en los productos",
      message: "Error al eliminar el productos",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    console.log("Error en los productos", error);
  }
}

async function modifyProductStock(req, res) {
  req.logger = addLogger;
  const { pid } = req.params;
  try {
    const result = await productService.modifyProductStock(pid);
    res.json({ message: "Producto actualizado", result });
  } catch (err) {
    const error = CustomError.generateError({
      name: "Error en los productos",
      message: "Error al modificar el producto",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    console.log("Error en los productos", error);
  }
}

async function createProducts(req, res) {
  req.logger = addLogger;
  try {
    for (let i = 0; i < 100; i++) {
      const newProductRandom = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: +faker.string.numeric(),
        thumbnail: faker.image.url(),
        quantity: 1,
      };
      const response = await productService.saveProduct(newProductRandom);
      console.log(response);
    }
    res.json({ status: "Success", message: "All products inserted" });
  } catch (err) {
    const error = CustomErrors.generateError({
      name: "Products Error",
      message: "Error al crear un producto",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    console.log(error);
  }
}

export {
  getProductos,
  getProductsById,
  modifyProducto,
  deleteProducto,
  saveProducto,
  modifyProductStock,
  createProducts,
};
