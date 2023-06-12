import "../../../loadEnvironment.js";
import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import chalk from "chalk";
import Book from "../../../database/models/Book.js";
import messages from "../../utils/messages/messages.js";
import CustomError from "../../CustomError/CustomError.js";
import statusCodes from "../../utils/statusCodes/statusCodes.js";
import {
  type CustomRequest,
  type BookStructure,
} from "../../../types/types.js";

const debug = createDebug(
  "bretaro-api:controllers:booksControllers:booksControllers.js"
);

export const getBooks = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const myBooks = await Book.find().sort({ _id: -1 }).limit(10).exec();

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
    const book = await Book.findById(id).exec();

    if (!book) {
      const deleteError = new CustomError(
        `${messages.errorDelete}`,
        statusCodes.notFound
      );
      throw deleteError;
    }

    await Book.findByIdAndDelete(id).exec();

    res.status(statusCodes.ok).json({ message: messages.bookDeleted });
  } catch (error: unknown) {
    next(error);
  }
};

export const addBook = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const newBook: BookStructure = req.body;

  try {
    const addedBook = await Book.create({ ...newBook });

    res
      .status(statusCodes.created)
      .json({ message: messages.bookAdded, addedBook });
  } catch (error: unknown) {
    (error as Error).message = messages.errorAdd;
    next(error);
  }
};

export const getBookById = async (
  req: Request<{ bookId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params;
  try {
    const myBook = await Book.findOne({ _id: bookId });

    if (!myBook) {
      const noBookError = new CustomError(
        `${messages.bookNotFound}`,
        statusCodes.notFound
      );
      throw noBookError;
    }

    res.status(statusCodes.ok).json({ myBook });
  } catch (error: unknown) {
    next(error);
  }
};
