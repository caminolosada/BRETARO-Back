import "../../loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../CustomError/CustomError";

const debug = createDebug;

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(chalk.red("Error: endpoint not found"));
  const error = new CustomError("Endpoint not found", 404);
  next(error);
};
