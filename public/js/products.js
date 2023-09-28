let buttons = document.querySelectorAll("button");
// let carrito = "";
// let carrito = document.getElementById("id-carrito");

buttons.forEach((button) => {
  button.addEventListener("click", agregarAlCarrito);
});

async function agregarAlCarrito(e) {
  // console.log("probando carrito", carrito);
  const pid = e.target.id;
  fetch(`http://localhost:8080/carts`, {
    method: "POST",
  })
    .then((resp) => resp.json())
    .then((data) => {
      let carrito = data.result._id;
      fetch(`http://localhost:8080/carts/${carrito}/product/${pid}`, {
        method: "POST",
      })
        .then((resp) => resp.json())
        .then((data) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto agregado correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log("Error", err);
        });
    });
}
