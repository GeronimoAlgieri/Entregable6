import passport from "passport";
import local from "passport-local";
// import { userRepository } from "../dao/repository/users.repository.js";
import { createHash, isValidPassword } from "../utils.js";
import { USER_DAO } from "../dao/index.js";
import GithubStrategy from "passport-github2";
import * as dotenv from "dotenv";
import jwt, { ExtractJwt } from "passport-jwt";
import config from "./config.js";
import UserModel from "../dao/mongo/models/user.js";
import { creatCart } from "../controller/carts.controller.js";

// const userService = new userRepository(USER_DAO);

dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;

const coockieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[config.jwt.COOKIE];
  }
  return token;
};

// const initializePassport = () => {
//   passport.use(
//     "register",
//     new LocalStrategy(
//       {
//         passReqToCallback: true,
//         usernameField: "email",
//         session: false,
//       },
//       async (req, email, password, done) => {
//         const { first_name, last_name, age } = req.body;
//         try {
//           console.log(email);

//           const user = await userService.getUserByEmail({ email: email });
//           console.log("user", user);
//           if (user) {
//             return done(null, false, { message: "El usuario ya existe" });
//           }
//           const newUser = {
//             first_name,
//             last_name,
//             email,
//             age,
//             password: createHash(password),
//           };
//           let result = await userService.createUser(newUser);
//           return done(null, result);
//         } catch (err) {
//           return done("Error al obtener el usuario", err);
//         }
//       }
//     )
//   );
const initializePassport = async () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email", session: false },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;
          console.log("passport config", req.body);
          if (!first_name || !last_name || !password || !age)
            return done(null, false, { message: "Incomplete values" });
          //¿El usuario ya está en la base de datos?
          // const exists = await USER_DAO.getUserByEmail({ email: email });
          const exists = await UserModel.findOne({ email });
          if (exists)
            return done(null, false, { message: "User already exists" });
          const hashedPassword = createHash(password);
          //Insertamos en la base
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
          };
          let result = await UserModel.create(newUser);
          const newCart = await creatCart();
          console.log("console.log de carrito passport config", newCart);
          console.log("resultado desde passport", result);
          //SI TODO SALIÓ BIEN EN LA ESTRATEGIA
          return done(null, result);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userService.getUserByEmail({ email });
          if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
          }
          const passwordValidation = await isValidPassword(user, password);
          if (!passwordValidation)
            return done(null, false, { message: "Contreña incorrecta" });
          return done(null, user);
        } catch (err) {
          return done("Error", err);
        }
      }
    )
  );

  passport.use(
    "current",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([coockieExtractor]),
        secretOrKey: config.jwt.SECRET,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userService.getUserByEmail({
            email: profile?.emails[0]?.value,
          });
          if (!user) {
            const newUser = {
              first_name: profile.displayName.split(" ")[0],
              last_name: profile.displayName.split(" ")[1],
              email: profile?.emails[0]?.value,
              age: 19,
              password: crypto.randomUUID(),
            };
            let result = await userService.createUser(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

  // passport.use(
  //   "jwt",
  //   new JwtStrategy(
  //     {
  //       jwtFromRequest: ExtractJwt.fromExtractors([coockieExtractor]),
  //       secretOrKey: "C0d3rS3cr3t",
  //     },
  //     async (jwt_payload, done) => {
  //       try {
  //         console.log("jwt", jwt_payload);
  //         let resp = await userService.({
  //           email: jwt_payload.user.username,
  //         });
  //         if (!resp) {
  //           return done(null, false, { message: "Usuario no encontrado" });
  //         } else {
  //           return done(null, jwt_payload);
  //         }
  //       } catch (err) {
  //         done(err);
  //       }
  //     }
  //   )
  // );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await UserModel.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};

export default initializePassport;
