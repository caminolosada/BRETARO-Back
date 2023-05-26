import { type Response, type NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type UserCredentialsRequest } from "../../../types/types";
import { mockedToken, mockedUser } from "../../testUtils";
import User from "../../../database/models/User";
import loginUser from "./loginUser";
import CustomError from "../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a loginUser controller", () => {
  const req: Partial<UserCredentialsRequest> = {
    body: {
      username: "camino",
      password: "camino1234",
    },
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next: NextFunction = jest.fn();

  const user = mockedUser;

  const token = mockedToken;

  User.findOne = jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue(user) });

  describe("When it receives a request with a valid username and password", () => {
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    jwt.sign = jest.fn().mockReturnValue(token);

    test("Then it should call the status method with a status code 200", async () => {
      const expectedStatusCode = 200;

      await loginUser(req as UserCredentialsRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the json method with the token", async () => {
      await loginUser(req as UserCredentialsRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request with invalid credentials and next function", () => {
    test("Then it should call the next function with the error message 'Wrong credentials' and status code 401", async () => {
      const expectedError = new CustomError("Wrong credentials", 401);

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(req as UserCredentialsRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
