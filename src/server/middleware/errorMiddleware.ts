import "../../loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../CustomError/CustomError.js";
import messages from "../utils/messages/messages.js";
import statusCodes from "../utils/statusCodes/statusCodes.js";

const debug = createDebug;

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  debug(chalk.red(`Error: ${messages.notFound}`));
  const error = new CustomError(messages.notFound, statusCodes.notFound);
  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(chalk.red(error.message));
  const errorMessage = error.publicMessage ?? messages.internalServerError;
  const statusCode = error.statusCode ?? statusCodes.internalServerError;

  res.status(statusCode).json({ message: errorMessage });
};
