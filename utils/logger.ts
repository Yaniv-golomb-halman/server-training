import { createLogger, format } from "winston";
import { config } from "dotenv";
import transports from "winston/lib/winston/transports";
import { MongoDB } from "winston-mongodb";

config();
export enum LogLevel {
  Trace = "trace",
  Debug = "debug",
  Info = "info",
  Warn = "warn",
  Error = "error",
  Fatal = "fatal",
}

const LogLevelOrder: Record<LogLevel, number> = {
  [LogLevel.Trace]: 0,
  [LogLevel.Debug]: 1,
  [LogLevel.Info]: 2,
  [LogLevel.Warn]: 3,
  [LogLevel.Error]: 4,
  [LogLevel.Fatal]: 5,
};

export const logger = createLogger({
  levels: LogLevelOrder,
  transports: [
    new transports.File({
      filename: "amaromach-info.log",
      level: "info",
      options: { useUnifiedTopology: true },
      format: format.combine(format.timestamp(), format.json()),
    }),
    new MongoDB({
      level: "warn",
      db: process.env.DATABASE_URL,
      options: { useUnifiedTopology: true },
    }),
  ],
});
