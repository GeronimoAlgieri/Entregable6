import dotenv from "dotenv";
import Command from "commander";

function configuracion() {
  const command = new Command();
  command.option("--mode <mode>", "Modo de desarrollo", "prods");
  command.parse();
  let mode = command.opts().mode;
  dotenv.config({
    path: mode == "PRODUCTION" ? "./.env" : "./.env.development",
  });
}

export default configuracion;
