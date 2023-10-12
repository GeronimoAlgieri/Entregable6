import jwt from "jsonwebtoken";

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

export { authToken, generateToken };
