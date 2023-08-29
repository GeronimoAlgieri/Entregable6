async function postLogin(username, password) {
  console.log(username, password);
  const response = await fetch("/api/session/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  console.log(data);
  if (data.status === "OK") {
    setTimeout(() => {
      window.location.href = "http://localhost:8080/api/products";
    }, 2000);
  } else {
    alert("Usuario no válido");
  }

  // const result = await response.json();
  // return result;
}

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  postLogin(username, password).then((datos) => console.log(datos));
});
