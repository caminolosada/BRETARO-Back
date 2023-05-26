import { type Request, type Response } from "express";
import statusCodes from "../../utils/statusCodes/statusCodes.js";
import messages from "../../utils/messages/messages.js";

export const pingController = (req: Request, res: Response) => {
  res.status(statusCodes.ok).json({ message: messages.pong });
};
