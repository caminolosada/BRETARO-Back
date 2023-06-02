import "../../../loadEnvironment.js";
import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import chalk from "chalk";
import Book from "../../../database/models/Book.js";
import messages from "../../utils/messages/messages.js";
import CustomError from "../../CustomError/CustomError.js";
import statusCodes from "../../utils/statusCodes/statusCodes.js";

const debug = createDebug(
  "bretaro-api:controllers:booksControllers:booksControllers.js"
);

const getBooks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const myBooks = await Book.find().limit(10).exec();

    res.status(200).json(myBooks);
  } catch {
    const booksError = new CustomError(
      `${messages.errorDb}: can't get books`,
      statusCodes.internalServerError
    );

    debug(chalk.redBright(booksError.message));
    next(booksError);
  }
};

export default getBooks;
