import "../../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import Book from "../../../database/models/Book.js";
import {
  booksMock,
  addBookMock,
  booksMockById,
} from "../../../mocks/booksMocks.js";
import {
  addBook,
  deleteBook,
  getBookById,
  getBooks,
} from "./booksControllers.js";
import statusCodes from "../../utils/statusCodes/statusCodes.js";
import messages from "../../utils/messages/messages.js";
import CustomError from "../../CustomError/CustomError.js";
import { Types } from "mongoose";
import {
  type CustomUpdateRequest,
  type CustomRequest,
} from "../../../types/types.js";
import { updateBookMock } from "../../../mocks/booksMocks.js";
import { updateBook } from "./booksControllers.js";

type CustomResponse = Pick<Response, "status" | "json">;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getBooks controller", () => {
  const req: Partial<CustomRequest> = {
    query: { limit: "7", status: "unread" },
  };
  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  describe("When it receives a request", () => {
    Book.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(booksMock),
    });
    test("Then it should call the response's method status with 200", async () => {
      const expectedStatusCode = statusCodes.ok;

      await getBooks(
        req as CustomRequest,
        res as Response,
        next as NextFunction,
      );

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
        statusCodes.internalServerError,
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
      const expectedStatusCode = statusCodes.ok;
      const expectedMessage = messages.bookDeleted;

      Book.findById = jest.fn().mockReturnValue({
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
  });
});

describe("Given a addBook controller", () => {
  const req: Partial<CustomRequest> = {
    body: addBookMock,
  };
  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a request with a valid book on its body, a response and a next function", () => {
    test("Then it should calls the response's method with status code '201' the message 'The book has been created' and the book created", async () => {
      const expectedStatusCode = statusCodes.created;
      const expectedMessage = messages.bookAdded;
      const expectedResult = {
        message: expectedMessage,
        addedBook: addBookMock,
      };

      Book.create = jest.fn().mockResolvedValue(addBookMock);

      await addBook(
        req as CustomRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe("When it receives an invalid book on its body, a response and a next function", () => {
    test("Then it should call the next function with the message 'Can't create this book'", async () => {
      const error = new Error(messages.errorAdd);

      Book.create = jest.fn().mockRejectedValue(error);

      await addBook(
        req as CustomRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a getBookById controller", () => {
  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with a valid id on its body, a response and a next function", () => {
    test("Then it should call the response's method status with 200 and the book that corresponds to that id", async () => {
      const idBook = "647711a81beb7e30d69afe00";
      const expectedBook = booksMock[0];

      const req: Partial<Request> = {
        params: { id: idBook },
      };

      const expectedStatusCode = statusCodes.ok;

      Book.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(expectedBook),
      });

      await getBookById(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ myBook: expectedBook });
    });
  });

  describe("When it receives a request with an invalid id on its body, a response and a next function", () => {
    test("Then it should call the next function with the error message 'Can't found this book'", async () => {
      const idBook = "invalidId";
      const expectedError = new CustomError(
        `${messages.bookNotFound}`,
        statusCodes.notFound,
        `${messages.bookNotFound}`,
      );

      const req: Partial<Request> = {
        params: { id: idBook },
      };

      Book.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await getBookById(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a updateBook controller", () => {
  const req: Partial<CustomUpdateRequest> = {
    body: booksMockById[1],
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with a valid book, a response and a next function", () => {
    test("Then it should calls the response's method with status code '200', the message 'The book has been succesfully updated' and the book updated", async () => {
      const expectedStatusCode = statusCodes.ok;
      const expectedMessage = messages.bookUpdated;
      const expectedResult = {
        message: expectedMessage,
        updatedBook: updateBookMock,
      };

      Book.findByIdAndUpdate = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(updateBookMock) });

      await updateBook(
        req as CustomUpdateRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe("When it receives and invalid book on its body, a response and a next function", () => {
    test("Then it should call the next function with the error message 'Can't update this book' and status code '400' ", async () => {
      const expectedError = new CustomError(
        `${messages.errorUpdated}`,
        statusCodes.badRequest,
        `${messages.errorUpdated}`,
      );

      Book.findByIdAndUpdate = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockRejectedValue(expectedError) });

      await updateBook(
        req as CustomUpdateRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
