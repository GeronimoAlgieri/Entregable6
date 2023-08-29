import { Router } from "express";
import UserModel from "../dao/models/user.js";
import { createHash } from "../utils.js";
import passport from "passport";

const router = Router();

function auth(req, res, next) {
  //console.log(req.session);
  if (req.session?.user && req.session?.admin) {
    return next();
  }
  return res.status(401).json("error de autenticacion");
}

// router.post("/login", async (req, res) => {
//   console.log(req.body);
//   const { username, password } = req.body;
//   const result = await UserModel.find({
//     email: username,
//     password,
//   });
//   if (result.length === 0) return res.status(401).json({ respuesta: "error" });
//   else {
//     req.session.user = username;
//     req.session.admin = true;
//     res.status(200).json({ respuesta: "ok" });
//   }
// });

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/session/failLogin",
  }),
  async (req, res) => {
    console.log(req.user);
    if (!req.user) {
      return res.status(401).json("error de autenticacion");
    }
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
    };
    req.session.admin = true;

    res.send({ status: "success", mesage: "user logged", user: req.user });
  }
);

router.get("/failLogin", async (req, res) => {
  console.log("failed strategy");
  res.send({ error: "failed" });
});

// router.post("/signup", async (req, res) => {
//   const { first_name, last_name, age, email, password } = req.body;

//   const result = await UserModel.create({
//     first_name,
//     last_name,
//     age,
//     email,
//     password: createHash(password),
//   });

//   if (result === null) {
//     return res.status(401).json({
//       respuesta: "error",
//     });
//   } else {
//     req.session.user = email;
//     req.session.admin = true;
//     res.status(200).json({
//       respuesta: "ok",
//     });
//   }
// });

router.post(
  "/signup",
  passport.authenticate("register", {
    failureRedirect: "/failRegister",
  }),
  async (req, res) => {
    res.send({ status: "success", message: "user register" });
  }
);
router.get("/failRegister", async (req, res) => {
  console.log("failed strategy");
  res.send({ error: "failed" });
});

router.get("/privado", auth, (req, res) => {
  res.render("topsecret", {
    nombre: req.session.user.first_name,
    apellido: req.session.user.last_name,
  });
});

router.post("/forgot", async (req, res) => {
  const { username, newPassword } = req.body;

  const result = await UserModel.find({
    email: username,
  });
  if (result.length === 0)
    return res.status(401).json({
      respuesta: "el usuario no existe",
    });
  else {
    const respuesta = await UserModel.findByIdAndUpdate(result[0]._id, {
      password: createHash(newPassword),
    });
    console.log(respuesta);
    res.status(200).json({
      respuesta: "se cambio la contrasena",
      datos: respuesta,
    });
  }
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
),
  async (req, res) => {};

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    req.session.admin = true;
    res.redirect("/");
  }
);

// router.get("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (!err) {
//       return res.json({
//         message: "Sesión cerrada",
//       });
//     } else {
//       return res.json({
//         message: "Error al cerrar sesión",
//       });
//     }
//   });
// });

export default router;
