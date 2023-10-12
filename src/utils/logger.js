import winston from "winston";

const devLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
    }),
    new winston.transports.Console({
      level: "http",
    }),
  ],
});

const prodLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info",
    }),
    new winston.transports.Console({
      level: "warn",
    }),
    new winston.transports.File({
      level: "error",
      filename: "./erros.log",
    }),
    new winston.transports.Console({
      level: "verbose",
    }),
  ],
});

export const addLogger =
  process.env.ENVIRONMENT === "DEVELOPMENT" ? devLogger : prodLogger;

// import winston from "winston";

// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console({
//       level: "http",
//     }),
//     new winston.transports.File({
//       filename: "./erros.log",
//       level: "warn",
//     }),
//   ],
// });

// const devLogger = winston.createLogger({
//   transports: [
//     new winston.transports.Console({
//       level: "verbose",
//     }),
//   ],
// });

// const prodLogger = winston.createLogger({
//   transports: [
//     new winston.transports.Console({
//       level: "http",
//     }),
//     new winston.transports.File({
//       filename: "./erros.log",
//       level: "warn",
//     }),
//   ],
// });

// export const addLogger = (req, res, next) => {
//   req.logger =
//     process.env.ENVIROMENT === "DEVELOPMENT" ? prodLogger : devLogger;
//   console.log(logger);

//   let { body } = req;
//   let bodyData = { ...body };
//   console.log(bodyData);

//   if (req.method === "POST" || req.method === "PUT") {
//     bodyData = JSON.stringify(bodyData);
//   } else {
//     bodyData = "";
//   }

//   req.logger.http(
//     `${req.method} ${
//       req.url
//     } - ${new Date().toLocaleTimeString()} - data:${bodyData}`
//   );
//   next();
// };
