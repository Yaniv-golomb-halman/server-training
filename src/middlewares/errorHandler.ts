import { buildError } from "../../utils/error";
import { Request, Response } from "express";
import { logger } from "../../utils/logger";

export function genericErrorHandler(err: any, req: Request, res: Response) {
  logger.error(err);
  const error = buildError(err);
  res.status(error.code).json({ error });
}
