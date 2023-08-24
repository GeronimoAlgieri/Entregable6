import { Router } from "express";
import UserModel from "../dao/models/user.js";

const router = Router();

function auth(req, res, next) {
  console.log(req.session);
  if (req.session?.user && req.session?.admin) {
    return next();
  }
  return res.status(401).json("error de autenticacion");
}

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const result = await UserModel.find({
    email: username,
    password,
  });
  if (result.length === 0) return res.status(401).json({ respuesta: "error" });
  else {
    req.session.user = username;
    req.session.admin = true;
    res.status(200).json({ respuesta: "ok" });
  }
});

router.post("/signup", async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;

  const result = await UserModel.create({
    first_name,
    last_name,
    age,
    email,
    password,
  });

  if (result === null) {
    return res.status(401).json({
      respuesta: "error",
    });
  } else {
    req.session.user = email;
    req.session.admin = true;
    res.status(200).json({
      respuesta: "ok",
    });
  }
});

router.get("/privado", auth, (req, res) => {
  res.render("topsecret", {});
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      return res.json({
        message: "Sesión cerrada",
      });
    } else {
      return res.json({
        message: "Error al cerrar sesión",
      });
    }
  });
});

export default router;
