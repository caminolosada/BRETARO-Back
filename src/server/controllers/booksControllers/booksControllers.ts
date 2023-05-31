import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import chalk from "chalk";
import Book from "../../../database/models/Book.js";
import messages from "../../utils/messages/messages.js";

const debug = createDebug(
  "bretaro-api:controllers:booksControllers:booksControllers.js"
);

const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const myBooks = await Book.find().limit(10).exec();
    res.status(200).json(myBooks);
  } catch (error) {
    error.message = `${messages.errorDb}: can't get books`;
    debug(chalk.redBright(error.message));
    next(error);
  }
};

export default getBooks;
