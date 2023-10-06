import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (savedPassword, password) => {
  console.log("Saved password: " + savedPassword, "Password: " + password);
  return bcrypt.compareSync(savedPassword, password);
};

export const authAdmin = (req, res, next) => {
  if (req.user.user.role !== "user")
    return res.send({ status: "error", message: "no eres admin" });
  next();
};

export function authUser(req, res, next) {
  if (req.session?.username) {
    next();
  }
}

// export const isValidPassword = (username, password) =>
//   bcrypt.compare(password, username.password);

export default __dirname;

const PRIVATE_KEY = "C0d3rS3cr3t";

const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "1h" });
  return token;
};

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) res.status(401).json({ message: "Error al autenticacion" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, PRIVATE_KEY, (err, user) => {
    if (err) res.status(403).json({ message: "token invalido" });
    req.user = user;
    next();
  });
};

const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      if (error) return next(error);
      if (!user)
        return res.status(401).json({
          error: info.messages ? info.messages : info.toString(),
        });
      user.role = "admin";
      req.user = user;
      next();
    })(req, res, next);
  };
};

const authorization = (role) => {
  return async (req, res, next) => {
    console.log(req.user);
    if (!req.user) return res.status(401).send({ error: "Unauthorized" });
    if (req.user.role != role)
      return res.status(403).send({ error: "No permissions" });
    next();
  };
};

export { generateToken, authToken, passportCall, authorization };
