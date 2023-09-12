async function postLogin(email, password) {
  console.log(email, password);
  const response = await fetch("/api/session/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  console.log(data);
  setTimeout(() => {
    window.location.href = "http://localhost:8080/api/products";
  }, 2000);
}

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  postLogin(email, password).then((datos) => console.log(datos));
});
