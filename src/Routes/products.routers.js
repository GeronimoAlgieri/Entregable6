import { Router } from "express";
import Product from "../dao/dbManager/products.manager.js";

const router = Router();
const productManager = new Product();

//Tomar productos
router.get("/", async (req, res) => {
  const { limit, page, sort } = req.query;
  const defaultLimit = 10;
  const defaultPage = 1;

  // Parsea el valor de la página a un número entero
  const currentPage = parseInt(page, 10) || defaultPage;

  try {
    let response = await productManager.getAll();

    // Resolución de la ordenación
    if (sort === "asc" || sort === "desc") {
      response.sort((a, b) => {
        return sort === "asc" ? a.price - b.price : b.price - a.price;
      });
    }

    const startIndex = (currentPage - 1) * (limit ? +limit : defaultLimit);
    const endIndex = startIndex + (limit ? +limit : defaultLimit);

    const paginatedResponse = response.slice(startIndex, endIndex);

    const totalPages = Math.ceil(
      response.length / (limit ? +limit : defaultLimit)
    );

    res.render("products", {
      products: paginatedResponse,
      pagination: {
        status: "success",
        totalPages: totalPages,
        prevPage: currentPage > 1 ? currentPage - 1 : null,
        nextPage: endIndex < response.length ? currentPage + 1 : null,
        page: currentPage,
        hasPrevPage: currentPage > 1,
        hasNextPage: endIndex < response.length,
        prevLink:
          currentPage > 1 ? `/api/products?page=${currentPage - 1}` : null,
        nextLink:
          endIndex < response.length
            ? `/api/products?page=${currentPage + 1}`
            : null,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener los productos",
      error: err,
    });
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
