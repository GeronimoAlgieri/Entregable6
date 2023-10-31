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
import sessionController from "../controller/session.controller.js";
import MailingService from "../service/mailing.js";
import { UserRepository } from "../dao/repository/users.repository.js";

const userService = new UserRepository();
const router = Router();
const temp = "";

function auth(req, res, next) {
  //console.log(req.session);
  if (req.session?.user && req.session?.admin) {
    return next();
  }
  return res.status(401).json("error de autenticacion");
}

router.post(
  "/register",
  passport.authenticate("register", {
    passReqToCallback: true,
    session: false,
    failureRedirect: "api/session/failedRegister",
    failureMessage: true,
  }),
  sessionController.register
);

router.get("/failedRegister", sessionController.failedRegister);

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
  passport.authenticate("current", { session: false }),
  sessionController.getCurrentUser
);

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
      respuesta: "se cambio la contraseña",
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

router.get("/recover", (req, res) => {
  res.render("recoverPassword", {
    tittle: "Recover password",
    script: "recoverPassword.js",
    PORT: process.env.PORT,
  });
});

router.post("/recoverPassword", async (req, res) => {
  const { mail } = req.body;
  try {
    // const mailer = new MailingService();
    // const result = await mailer.sendSimpleMail({
    //   from: "Has olvidado tu contraseña <coderhouse@gmail.com>",
    //   to: mail,
    //   subject: "Has olvidado tu contraseña",
    //   html: {
    //     "Expity-Date": new Date(Date.now() + 3600000).toUTCString(),
    //   },
    //   html: `
    //   <h1>Has olvidado tu contraseña</h1>
    //   <a href="http://localhost:${process.env.PORT}/replacePassword"><button>Recuperar contraseña</button></a>`,
    // });
    // temp = await userService.getUserByEmail(mail);
    // console.log(result);
    // res.json({ status: "success", message: "mensaje enviado" });
    await transport.sendMail({
      from: "Forgot password <coder123@gmail.com>",
      to: mail,
      subject: "Forgot password",
      headers: {
        "Expiry-Date": new Date(Date.now() + 3600 * 1000).toUTCString(),
      },
      html: `
          <h1>Forgot password</h1>
       <a href="http://localhost:${process.env.PORT}/replacePassword"><button>Recuperar contraseña</button></a>
      `,
    });
    temp = await userService.getUserByEmail(mail);
    res.json({ status: "success", message: "Mail sended" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/replacePassword", (req, res) => {
  res.render("replacePassword", {
    title: "Restablecer contraseña",
    script: "replacePassword.js",
  });
});

router.post("/replace", async (req, res) => {
  try {
    const { pass } = req.body;
    const user = await userService.getUserByEmail(temp.email);
    console.log(user);
    if (isValidPassword(pass, user.password)) {
      return res.json({ status: "error", message: "misma contraseña" });
    } else {
      user.password = createHash(pass);
      const data = await userService.modifyUser(user.id, user);
      res.json({ status: "success", message: "Contraseña restablecida", data });
    }
  } catch (err) {
    console.log(err);
  }
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
