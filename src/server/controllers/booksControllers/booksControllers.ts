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

export const getBooks = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const book = await Book.findOne({ id }).exec();

    if (!book) {
      res
        .status(404)
        .json({ message: "Can't delete this book because it doesn't exist" });
      return;
    }

    await Book.findByIdAndDelete(id).exec();

    res.status(200).json({ message: "The book has been deleted" });
  } catch (error: unknown) {
    next(error);
  }
};
