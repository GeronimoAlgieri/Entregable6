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

const postSignup = async (first_name, last_name, age, email, password) => {
  const response = await fetch("/api/session/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first_name, last_name, age, email, password }),
  });
  const data = await response.json();
  console.log("all  the data", postSignup);
  console.log(data);
  if (data.status === "success") {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Registrado con exito!",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      window.location.href = loc[0] + ":" + loc[1] + ":" + loc[2].split("/")[0];
    }, 2000);
  }
  return data;
};
