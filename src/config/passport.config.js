import passport from "passport";
import local from "passport-local";
import UserModel from "../dao/models/user.js";
import { createHash, isValidPassword } from "../utils.js";
import GithubStrategy from "passport-github2";
import * as dotenv from "dotenv";
import jwt, { ExtractJwt } from "passport-jwt";

dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;

const coockieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["C0d3rS3cr3t"];
  }
  return token;
};

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          console.log(username);

          const user = await UserModel.findOne({ email: username });
          console.log("user", user);
          if (user) {
            return done(null, false, { message: "El usuario ya existe" });
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          let result = await UserModel.create(newUser);
          return done(null, result);
        } catch (err) {
          return done("Error al obtener el usuario", err);
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
      async (req, username, password, done) => {}
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
          let user = await UserModel.findOne({
            email: profile?.emails[0]?.value,
          });
          if (!user) {
            const newUser = {
              first_name: profile.displayName.split(" ")[0],
              last_name: profile.displayName.split(" ")[1],
              email: profile?.emails[0]?.value,
              age: 19,
              password: "",
            };
            let result = await UserModel.create(newUser);
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

  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([coockieExtractor]),
        secretOrKey: "C0d3rS3cr3t",
      },
      async (jwt_payload, done) => {
        try {
          let resp = await UserModel.findOne({
            email: jwt_payload.user.username,
          });
          if (!resp) {
            return done(null, false, { message: "Usuario no encontrado" });
          } else {
            return done(null, jwt_payload);
          }
        } catch (err) {
          done(err);
        }
      }
    )
  );

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
