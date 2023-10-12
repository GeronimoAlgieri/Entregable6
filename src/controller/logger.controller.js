import { addLogger } from "../utils/logger.js";

function getLogger(req, res) {
  req.logger = addLogger;
  req.logger.debug("Debug " + new Date().toLocaleDateString());
  req.logger.http("Http " + new Date().toLocaleTimeString() + " " + req.method);
  req.logger.info("Info " + new Date().toISOString());
  req.logger.warn("Warning " + new Date().toISOString());
  req.logger.error("error " + new Date().toLocaleDateString());
  req.logger.verbose("fatal " + new Date().toLocaleDateString());
  res.send("Logger");
}

export { getLogger };
