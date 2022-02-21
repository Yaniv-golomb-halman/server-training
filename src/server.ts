import mongoose, { Connection } from "mongoose";
import express from "express";
import { Express } from "express/ts4.0";
import { config } from "dotenv";
import { productsRouter } from "../routes/products";
import { logger, LogLevel } from "utils/logger";
import { genericErrorHandler } from "./middlewares/errorHandler";

config();

export const launchServer = () => {
  const app: Express = express();
  const PORT: string = process.env.port || "5000";

  mongoose.connect(process.env.DATABASE_URL).catch((err) => {
    logger.log(
      LogLevel.Fatal,
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    process.exit();
  });
  const db: Connection = mongoose.connection;
  db.on("error", (err) => logger.error(`server has started ${err}`));
  db.once("open", () => logger.info("connected to db"));

  app.use(express.json());
  app.use("/products", productsRouter);
  app.use(genericErrorHandler);

  app.listen(PORT, () => logger.info("server has started"));
};
