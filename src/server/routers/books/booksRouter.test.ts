import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDataBase from "../../../database/connectToDataBase";
import mongoose from "mongoose";
import Book from "../../../database/models/Book";
import booksMock from "../../../mocks/booksMocks.js";
import statusCodes from "../../utils/statusCodes/statusCodes";
import { app } from "../..";
import paths from "../../utils/paths/paths.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDataBase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given a GET '/books' endopoint", () => {
  beforeEach(async () => {
    await Book.create(booksMock);
  });
  describe("When it receives a request", () => {
    test("Then it should call the response's method status with 200 and a collection of two books", async () => {
      const expectedStatusCode = statusCodes.ok;

      const response = await request(app)
        .get(`${paths.books}`)
        .expect(expectedStatusCode);

      expect(response.body).toHaveLength(2);
    });
  });
});
