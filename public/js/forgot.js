// async function postLogin(username, password) {
//   const resp = await fetch("/api/session/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password }),
//   });

//   const result = await resp.json();
//   return result;
// }

// const loginForm = document.getElementById("login-form");

// loginForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//   const newPassword = document.getElementById("newPassword").value;
//   const newTwoPassword = document.getElementById("newTwoPassword").value;
//   if (newPassword != newTwoPassword) {
//     alert("La nueva contraseña no coincide");
//   } else {
//     postForgot(username, newPassword)
//       .then((datos) => alert("Contrasena reiniciada", datos.respuesta))
//       .catch((err) => alert("algo a pasado, por favor valide"));
//   }
// });
