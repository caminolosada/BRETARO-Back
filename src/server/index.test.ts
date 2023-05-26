import request from "supertest";
import { type CustomResponse } from "./testUtils.js";
import { app } from "./index.js";
import statusCodes from "./utils/statusCodes/statusCodes.js";
import messages from "./utils/messages/messages.js";

describe("Given a Get method with the path '/'", () => {
  describe("When it receives a request", () => {
    test("Then it should call the response's method status with code 200 and response's method json with the message '🏓 Pong'", async () => {
      const expectedStatusCode = statusCodes.ok;
      const expectedMessage = messages.pong;
      const response: CustomResponse = await request(app)
        .get("/")
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual({ message: expectedMessage });
    });
  });
});
