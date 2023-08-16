import fs from "fs";
import __dirname from "../../utils.js";

const path = __dirname + "../../data/carts.json";

export default class Products {
  getAll = async () => {
    if (fs.existsSync(path)) {
      try {
        let result = await fs.promises.readFile(path, "utf-8");
        let data = await JSON.parse(result);
        return data;
      } catch (err) {
        console.log("No ha sido posible leer el archivo" + err);
      }
    } else {
      return [];
    }
  };

  saveProduct = async (producto) => {
    try {
      let products = await this.getAll();
      if (products.length === 0) {
        producto.id = 1;
        products.push(producto);
        await fs.promises.writeFile(path, JSON.stringify(data));
      } else {
        user.id = users[users.length - 1].id + 1;
        await fs.promises.writeFile(path, JSON.stringify(data));
        return products;
      }
    } catch (err) {
      console.log("No ha sido posible escribir el archivo" + err);
    }
  };
}
