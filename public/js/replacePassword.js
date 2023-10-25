const buton = document.getElementById("password");
const newPassword = document.getElementById("new-password");

buton.addEventListener("click", async () => {
  const resp = await fetch("/replace", {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify({ pass: newPassword.value }),
  });

  const data = await resp.json();

  if (data.status === "error") {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Contraseña en uso",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Contraseña cambiada",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      window.location.href = loc + "/";
    }, 1000);
  }
});
