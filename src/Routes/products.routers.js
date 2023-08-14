import { Router } from "express";
import Product from "../dao/dbManager/products.manager.js";

const router = Router();
const productManager = new Product();

//Tomar productos
router.get("/all", async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  const results = await ProductsModel.paginate(
    query ? { category: query } : {},
    { limit, page, lean: true, sort: sort ? { price: 1 } : { price: -1 } }
  );
  let prevLink = results.hasPrevPage
    ? `http://localhost:8080/productos/?page=${
        +page - 1
      }&limit=${limit}&query=${query}&sort=${sort}`
    : null;
  let nextLink = results.hasNextPage
    ? `http://localhost:8080/productos/?page=${
        +page + 1
      }&limit=${limit}&query=${query}&sort=${sort}`
    : null;
  results.prevLink = prevLink;
  results.nextLink = nextLink;
  res.send(results);
  try {
    const products = await productManager.getAll();
    res.json({ message: "success", products: products });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener los productos", data: err });
  }
});
//Tomar producto por id
router.get("/", async (req, res) => {
  const { limit } = req.params;
  try {
    let resp = await productManager.getAll();
    console.log(resp);
    if (limit) {
      let tempArray = resp.slice(0, limit);
      res.render("products", { products: tempArray });
    } else {
      res.render("products", { products: resp });
    }
  } catch (err) {
    res.render({ message: "Error al obtener los productos", data: err });
  }
});
//Modificar un producto
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getOne(pid);
    if (product) {
      res.json({ message: "success", products: product });
    } else {
      res.status(400).json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener el producto",
      data: err,
    });
  }
});

router.post("/", async (req, res) => {
  let codeExist;
  try {
    let products = await productManager.getAll();
    codeExist = products.find((product) => product.code === code);
  } catch (err) {
    console.log(err);
  }

  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  if (!title || !description || !price || !code || !stock) {
    res.status(400).json({ message: "Faltan datos" });
  }

  if (codeExist) {
    res.status(400).json({ message: "El código ya existe" });
  } else {
    let productoNuevo = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails: !thumbnails ? "" : thumbnails,
    };
    try {
      await productManager.saveProduct(productoNuevo);
      res.json({ message: "Producto creado con éxito", data: productoNuevo });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al crear el producto", data: err });
    }
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const data = req.body;
  try {
    if (Object.keys(data).length === 0) {
      res.status(400).json({ message: "Faltan datos" });
    } else {
      await productManager.updateProduct(pid, data);
      res.json({ message: "Producto modificado", data: data });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al modificar el producto", data: data });
  }
});
//Borrar un producto
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const resp = await productManager.deleteProduct(pid);
    if (resp) {
      res.json({ message: "Producto eliminado", producto: resp });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar el producto", err: err });
  }
});
//Agregar un producto

export default router;
