import "../../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import Book from "../../../database/models/Book.js";
import booksMock from "../../../mocks/booksMocks.js";
import { deleteBook, getBooks } from "./booksControllers.js";
import statusCodes from "../../utils/statusCodes/statusCodes.js";
import messages from "../../utils/messages/messages.js";
import CustomError from "../../CustomError/CustomError.js";
import { Types } from "mongoose";

type CustomResponse = Pick<Response, "status" | "json">;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getBooks controller", () => {
  const req = {};
  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  describe("When it receives a request", () => {
    Book.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(booksMock),
      }),
    });
    test("Then it should call the response's method status with 200", async () => {
      const expectedStatusCode = statusCodes.ok;

      await getBooks(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the method json with a collection of two books", async () => {
      const expectedCollection = booksMock;

      await getBooks(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith(expectedCollection);
    });
  });

  describe("When the find method rejects and receives a next function", () => {
    test("Then it should call the next function with the error 'Error connecting to database: can't get books'", async () => {
      const error = new CustomError(
        `${messages.errorDb}: can't get books`,
        statusCodes.internalServerError
      );

      Book.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(error),
      });

      await getBooks(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a deleteBook controller", () => {
  const idBook = new Types.ObjectId().toString();

  const req: Partial<Request> = {
    params: { idBook },
  };

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with an existing book id , a response and next function", () => {
    test("Then it should call its status method with a status 200 and the response method with the message 'The book has been deleted'", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = messages.bookDeleted;

      Book.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(idBook),
      });

      Book.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(idBook),
      });

      await deleteBook(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives a request with an invalid id, a response and next function", () => {
    test("Then it should call the next function with an error message", async () => {
      const expectedError = new Error(`${messages.errorDelete}`);

      Book.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await deleteBook(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });

    test("Then it should call its status method with a status 404 and the response method with the message 'Can't delete this book because it doesn't exist' ", async () => {
      const expectedStatusCode = 404;
      const expectedMessage = messages.errorDelete;

      Book.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await deleteBook(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});
