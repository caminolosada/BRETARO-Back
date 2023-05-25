import { type NextFunction, type Request, type Response } from "express";
import { notFoundError } from "./errorMiddleware";
import CustomError from "../CustomError/CustomError";

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
