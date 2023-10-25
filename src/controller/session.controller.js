import jwt from "jsonwebtoken";
import config from "../config/config.js";

const register = (req, res) => {
  res.send({
    status: "success",
    message: "Usuario registrado",
    payload: req.user._id,
  });
};

const failedRegister = (req, res) => {
  res.send("failed register");
};

const login = (req, res) => {
  const serializeUser = {
    id: req.user._id,
    name: `${req.user.first_name} ${req.user.last_name}`,
    role: req.user.role,
    email: req.user.email,
  };
  const token = jwt.sign(serializeUser, config.jwt.SECRET, {
    expiresIn: "1h",
  });
  res
    .cookie(config.jwt.COOKIE, token, { maxAge: 3600000 })
    .send({ status: "success", payload: serializeUser });
};

const failedLogin = (req, res) => {
  console.log(req.message);
  res.send("failed login");
};

const getCurrentUser = (req, res) => {
  console.log(req.user);
  res.send(req.user);
};

export default { register, failedRegister, login, failedLogin, getCurrentUser };
