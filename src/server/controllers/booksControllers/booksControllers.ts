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
  type CustomUpdateRequest,
} from "../../../types/types.js";
import { type FilterQuery, Types } from "mongoose";

const debug = createDebug(
  "bretaro-api:controllers:booksControllers:booksControllers.js",
);

export const getBooks = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { limit, status } = req.query;
    const limitNumber = Number(limit);

    const bookFilter: FilterQuery<BookStructure> = {};

    if (status) {
      bookFilter.status = status;
    }

    const myBooks = await Book.find(bookFilter)
      .sort({ _id: -1 })
      .limit(limitNumber)
      .exec();

    res.status(statusCodes.ok).json(myBooks);
  } catch {
    const booksError = new CustomError(
      `${messages.errorDb}: can't get books`,
      statusCodes.notFound,
      messages.bookNotFound,
    );

    debug(chalk.redBright(booksError.message));
    next(booksError);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).exec();

    if (!book) {
      const deleteError = new CustomError(
        `${messages.errorDelete}`,
        statusCodes.notFound,
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
  next: NextFunction,
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
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const myBook = await Book.findById(id).exec();

    res.status(statusCodes.ok).json({ myBook });
  } catch {
    const noBookError = new CustomError(
      `${messages.bookNotFound}`,
      statusCodes.notFound,
      `${messages.bookNotFound}`,
    );

    next(noBookError);
  }
};

export const updateBook = async (
  req: CustomUpdateRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body } = req;

    const updatedBook = await Book.findByIdAndUpdate(
      body.id,
      { ...body, _id: new Types.ObjectId(body.id) },
      { returnDocument: "after" },
    ).exec();

    res
      .status(statusCodes.ok)
      .json({ message: messages.bookUpdated, updatedBook });
  } catch {
    const noUpdateError = new CustomError(
      `${messages.errorUpdated}`,
      statusCodes.badRequest,
      `${messages.errorUpdated}`,
    );

    next(noUpdateError);
  }
};
