import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import statusCodes from "../../utils/statusCodes/statusCodes.js";
import connectToDataBase from "../../../database/connectToDataBase.js";
import User from "../../../database/models/User.js";
import {
  mockedIncompleteCredentials,
  mockedUserCredentials,
  mockedUserHashed,
  wrongMockedUserCredentials,
} from "../../../mocks/userMocks.js";
import { app } from "../..";
import paths from "../../utils/paths/paths.js";
import messages from "../../utils/messages/messages.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDataBase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST '/user/login' endpoint", () => {
  beforeEach(async () => {
    await User.create(mockedUserHashed);
  });
  describe("When it receives a request with valid username and password", () => {
    test("Then it should respond with a response with status 200 and a token", async () => {
      const expectedStatus = statusCodes.ok;

      const newUser = await User.findOne({
        username: mockedUserCredentials.username,
      }).exec();

      const response = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(mockedUserCredentials)
        .expect(expectedStatus);

      const payload = jwt.verify(
        response.body.token as string,
        process.env.JWT_SECRET!
      );

      const userId = payload.sub as string;

      expect(userId).toStrictEqual(newUser?._id.toString());
    });
  });

  describe("When it receives an invalid username", () => {
    test("Then it should respond with status 401 and a message 'Wrong credentials'", async () => {
      const expectedStatus = statusCodes.unauthorized;
      const expectedMessage = messages.wrongCredentials;

      const response = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(wrongMockedUserCredentials)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });

  describe("When it receives a request without password", () => {
    test("Then it should respond with status 400 and a message 'Password is not allowed to be empty'", async () => {
      const expectedStatus = statusCodes.badRequest;
      const expectedMessage = "password is required";

      const response = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(mockedIncompleteCredentials)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
