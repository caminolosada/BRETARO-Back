import "../../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import Book from "../../../database/models/Book.js";
import booksMock from "../../../mocks/booksMocks.js";
import { getBooks } from "./booksControllers.js";
import statusCodes from "../../utils/statusCodes/statusCodes.js";
import messages from "../../utils/messages/messages.js";
import CustomError from "../../CustomError/CustomError.js";

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
  describe("When it receives a response", () => {
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
