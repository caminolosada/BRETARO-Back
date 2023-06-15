import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDataBase from "../../../database/connectToDataBase";
import mongoose, { Types } from "mongoose";
import Book from "../../../database/models/Book";
import { booksMock, booksMockById } from "../../../mocks/booksMocks.js";
import statusCodes from "../../utils/statusCodes/statusCodes";
import { app } from "../..";
import paths from "../../utils/paths/paths.js";
import messages from "../../utils/messages/messages";
import { addBookMock } from "../../../mocks/booksMocks.js";

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
  await Book.deleteMany();
});

beforeEach(() => {
  jest.clearAllMocks();
});

beforeEach(async () => {
  await Book.create(booksMock);
});

describe("Given a GET '/books' endopoint", () => {
  describe("When it receives a request", () => {
    test("Then it should call the response's method status with 200 and a collection of two books", async () => {
      const expectedStatusCode = statusCodes.ok;

      const response = await request(app)
        .get(`${paths.books}`)
        .expect(expectedStatusCode);

      expect(response.body).toHaveLength(2);
    });

    test("Then it should respond with a collection of two books titled 'El desorden que dejas' and 'La ridícula idea de no volver a verte'", async () => {
      const expectedTitle1 = booksMock[1].title;
      const expectedTitle2 = booksMock[0].title;

      const response = await request(app).get(`${paths.books}`);

      expect(response.body[0].title).toBe(expectedTitle1);
      expect(response.body[1].title).toBe(expectedTitle2);
    });
  });
});

describe("Given a DELETE '/books/delete/:id' endpoint", () => {
  describe("When it receives a request with an id of an existing book", () => {
    test("Then it should call the response's method status with 200 and the message 'The book has been deleted'", async () => {
      const expectedStatusCode = statusCodes.ok;
      const expectedMessage = messages.bookDeleted;
      const bookId = "647711a81beb7e30d69afe00";

      const response = await request(app)
        .delete(`${paths.books}/delete/${bookId}`)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });

    describe("When it receives a request with an invalid id", () => {
      test("Then it should call the response's method status with 404 and the message 'Can't delete this book because it doesn't exist'", async () => {
        const expectedMessage = messages.errorDelete;
        const expectedStatusCode = statusCodes.notFound;
        const bookId = new Types.ObjectId().toString();

        const response = await request(app)
          .delete(`${paths.books}/delete/${bookId}`)
          .expect(expectedStatusCode);

        expect(response.body.message).toBe(expectedMessage);
      });
    });
  });
});

describe("Given a POST '/books/add' endpoint", () => {
  describe("When it receives a valid book in the body's request", () => {
    test("Then it should call the response's method status with 201, the message 'The book has been created' and the new book created", async () => {
      const expectedStatusCode = statusCodes.created;

      const expectedNewBookProperty = "addedBook";
      const expectedMessageProperty = "message";

      const response = await request(app)
        .post(`${paths.books}/add`)
        .send(addBookMock)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty(expectedNewBookProperty);
      expect(response.body).toHaveProperty(expectedMessageProperty);
    });
  });

  describe("When it receives an invalid book in the body's request, as a book without author required property", () => {
    test("Then it should call the response's method '400' and the message 'author is not allowed to be empty'", async () => {
      const expectedStatusCode = statusCodes.badRequest;
      const expectedMessage = "author is not allowed to be empty";
      addBookMock.author = "";

      const response = await request(app)
        .post(`${paths.books}/add`)
        .send(addBookMock)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});

describe("Given a GET '/books/:id' endpoint", () => {
  describe("When it receives a valid id in the body's request", () => {
    test("Then it should responds with the book that corresponds to that id", async () => {
      const expectedStatusCode = statusCodes.ok;

      const response = await request(app)
        .get(`${paths.books}/${booksMock[1]._id.toString()}`)
        .expect(expectedStatusCode);

      expect(response.body.myBook).toStrictEqual(booksMockById[1]);
    });
  });

  describe("When it receives an invalid id in the body's request", () => {
    test("Then it should responds with status 404 and the message 'Can't found this book'", async () => {
      const expectedStatusCode = statusCodes.notFound;
      const expectedMessage = messages.bookNotFound;
      const failedId = "64874d6ffa8ea2d9c28c33";

      const response = await request(app)
        .get(`${paths.books}/${failedId}`)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
