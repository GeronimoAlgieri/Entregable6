let botonesEliminar = document.getElementsByClassName("delete");
for (let i = 0; i < botonesEliminar.length; i++) {
  botonesEliminar[i].addEventListener("click", eliminarDelCarrito);
}

let formComprar = document.getElementById("comprar");

const totalProducts = [];

async function getProductById() {
  for (let i = 0; i < botonesEliminar.length; i++) {
    try {
      const response = await fetch(`/products/${botonesEliminar[i].id}`);
      const products = await response.json();
      totalProducts.push(products.product);
    } catch (err) {
      console.log(err);
    }
  }
}

getProductById();

formComprar.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    totalProducts.forEach(async (product) => {
      const response = await fetch(`/api/products/stock/${product._id}`, {
        method: "PUT",
      });
      const dataM = await response.json();
      console.log(dataM);
    });
    const code = generateRandomPurchaseCode(10);
    const totalAmount = totalProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    const idCarrito = cart;
    const response = await fetch(`/carts/${idCarrito}/purchase/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalAmount, email, code }),
    });
    const data = await response.json();
    console.log(data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Compra exitosa" + JSON.stringify(data),
      showConfirmButton: false,
      timer: 1500,
    });
    vaciarCarrito();
  } catch (err) {
    console.log(err);
  }
});
