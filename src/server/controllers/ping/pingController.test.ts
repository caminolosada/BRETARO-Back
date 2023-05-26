import { type Request, type Response } from "express";
import { pingController } from "./pingController";
import statusCodes from "../../utils/statusCodes/statusCodes.js";
import messages from "../../utils/messages/messages";

describe("Given a pingController controller", () => {
  describe("When it receives a response", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call the response's method status with code 200", () => {
      const expectedStatusCode = statusCodes.ok;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with the message '🏓 Pong'", () => {
      const expectedMessage = messages.pong;

      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});
