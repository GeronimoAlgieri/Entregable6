import { Router } from "express";
import UserModel from "../dao/mongo/models/user.js";
import {
  createHash,
  isValidPassword,
  passportCall,
  authorization,
} from "../utils.js";
import passport from "passport";
import { generateToken } from "../utils/authToken.js";

const router = Router();

function auth(req, res, next) {
  //console.log(req.session);
  if (req.session?.user && req.session?.admin) {
    return next();
  }
  return res.status(401).json("error de autenticacion");
}

// router.post(
//   "/login",
//   passport.authenticate("login", {
//     failureRedirect: "/api/session/failLogin",
//   }),
//   async (req, res) => {
//     const { username, password } = req.body;
//     const user = await UserModel.findOne({ username, password });
//     if (!user) {
//       return res.status(401).json("Usuario no encontrado");
//     } else {
//       if (!isValidPassword(username, username.password)) {
//         return res.status(401).json({ mesage: "contraseña invalida" });
//       } else {
//         const myToken = generateToken(user);
//         res.cookie("C0d3rS3cr3t", myToken, {
//           maxAge: 60 * 60 * 1000,
//           httpOnly: true,
//         });
//         return res.status(200).json({ message: "success" });
//       }
//     }
//   }
// );

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return res.json({ status: "error", message: "User not found" });
  } else {
    if (!isValidPassword(password, user.password)) {
      return res.json({ status: "error", message: "Invalid password" });
    } else {
      const myToken = generateToken(user);
      res.cookie("C0d3rS3cr3t", myToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ status: "success" });
    }
  }
});

router.get(
  "/current",
  passportCall("jwt"),
  authorization("user"),
  (req, res) => {
    res.send({
      fullname: req.user.user.fullname,
      age: req.user.user.age,
      role: req.user.user.role,
    });
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
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    req.session.user = req.user;
    req.session.admin = true;
    res.redirect("/api/products");
  }
);

router.get("/privado", auth, (req, res) => {
  res.render("topsecret", {
    nombre: req.session.user.first_name,
    apellido: req.session.user.last_name,
  });
});

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
