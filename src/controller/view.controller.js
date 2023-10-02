import { CART_DAO } from "../dao/index.js";

async function showCart(req, res) {
  try {
    const { cid } = req.params;
    try {
      let carrito = await CART_DAO.getCartById(cid);
      console.log(carrito);
      if (carrito) {
        let productos = carrito.products.map((p) => p.product);
        if (productos.length === 0) {
          res.send("El carrito está vacio");
        } else {
          res.render("carts", {
            title: "Carrito",
            productos,
            script: "cart.js",
            MONGO: process.env.PERSISTENCE === "MONGO",
          });
        }
      } else {
        res.send("Carrito no encontrado");
      }
    } catch (err) {
      console.log(err);
      res.send("Error al cargar el carrito");
    }
  } catch (err) {
    console.log(err);
  }
}

export { showCart };
