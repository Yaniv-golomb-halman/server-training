import { buildError } from "../../utils/error";
import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils/logger";

export function genericErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err);
  const error = buildError(err);
  res.status(error.code).json({ error });
}
