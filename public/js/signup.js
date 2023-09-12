const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", function (event) {
  console.log("tracking");
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const age = document.getElementById("age").value;

  postSignup(first_name, last_name, age, email, password).then((datos) =>
    console.log(datos)
  );
});
console.log("Probando js");
async function postSignup(first_name, last_name, age, email, password) {
  const data = {
    first_name,
    last_name,
    age,
    email,
    password,
  };

  console.log("all  the data", data);
  const response = await fetch("/api/session/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}
