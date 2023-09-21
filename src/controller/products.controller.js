import { PRODUCT_DAO } from "../dao/index.js";

async function getProductos(req, res) {
  try {
    const result = await PRODUCT_DAO.getProducts(req, res);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
}

async function getProductsById(req, res) {
  try {
    const { pid } = req.params;
    const result = await PRODUCT_DAO.getProductById(pid);
    res.json({ message: "Producto seleccionado", result: result });
  } catch (err) {
    console.log(err);
  }
}

async function modifyProducto(req, res) {
  try {
    const { pid } = req.params;
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
      return res.status(500).json({ message: "Faltan datos" });
    } else {
      const producto = {
        title: title,
        description: description,
        code: code,
        price: +price,
        status: true,
        stock: +stock,
        category: category,
        thumbnail: thumbnail,
      };
      const data = await PRODUCT_DAO.modifyProduct(producto, pid);
      res.json({ message: "Producto modificado", data });
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteProducto(req, res) {
  try {
    const { pid } = req.params;
    const result = await PRODUCT_DAO.deleteProduct(pid);
    res.json({ message: "Producto eliminado", result });
  } catch (err) {
    console.log(err);
  }
}

async function saveProducto(req, res) {
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
        category: category,
        thumbnail: thumbnail,
        quantity: 1,
      };
      const result = await PRODUCT_DAO.saveProduct(productoNuevo);
      res.status(201).json({ message: "Producto guardado", result });
    }
  } catch (err) {
    console.log(err);
  }
}

export {
  getProductos,
  getProductsById,
  modifyProducto,
  deleteProducto,
  saveProducto,
};
