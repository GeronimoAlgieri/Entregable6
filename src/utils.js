import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import passport from "passport";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (savedPassword, password) => {
  console.log("Saved password: " + savedPassword, "Password: " + password);
  return bcrypt.compareSync(savedPassword, password);
};

// export const isValidPassword = (username, password) =>
//   bcrypt.compare(password, username.password);

export default __dirname;

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

export { passportCall, authorization };
