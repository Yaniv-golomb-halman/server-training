import { logger } from "utils/logger";
import http from "http";
import app from "./app";

const port = app.get("port");
const server: http.Server = app.listen(port, () =>
  logger.info(`"server has started on port ${port}`)
);
export default server;
