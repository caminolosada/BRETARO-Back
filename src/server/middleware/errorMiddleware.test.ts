import { type NextFunction, type Request, type Response } from "express";
import { generalError, notFoundError } from "./errorMiddleware";
import CustomError from "../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a notFoundError middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the nest function with a 404 'Endpoint not found' error", () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      const expectedError = new CustomError("Endpoint not found", 404);

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a generalError middleware", () => {
  const req = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives an error with status code 404 and the error message 'Endpoint not found'", () => {
    const error = new CustomError("Endpoint not found", 404);

    beforeEach(() => {
      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );
    });

    test("Then it should call the response method with the message 'Endpoint not found'", () => {
      const expectedMessage = "Endpoint not found";

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });

    test("Then it should call the status method with status code 404", () => {
      const expectedStatus = 404;

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives an error without status code", () => {
    const error = new Error();

    beforeEach(() => {
      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );
    });
    test("Then it should call the response method with the message 'Internal server error'", () => {
      const expectedMessage = "Internal server error";

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });

    test("Then it should call the status method with status code 500", () => {
      const expectedStatus = 500;

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});
