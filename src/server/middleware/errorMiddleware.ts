import "../../loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../CustomError/CustomError.js";

const debug = createDebug;

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  debug(chalk.red("Error: endpoint not found"));
  const error = new CustomError("Endpoint not found", 404);
  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(chalk.red(error.message));
  const errorMessage = error.publicMessage ?? "Internal server error";
  const statusCode = error.statusCode ?? 500;

  res.status(statusCode).json({ message: errorMessage });
};
