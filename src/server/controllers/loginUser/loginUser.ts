import { type NextFunction, type Response } from "express";
import bcrypt from "bcryptjs";
import { type UserCredentialsRequest } from "../../../types/types";
import User from "../../../database/models/User";
import CustomError from "../../CustomError/CustomError";
import jwt, { type JwtPayload } from "jsonwebtoken";
import messages from "../../utils/messages/messages";
import statusCodes from "../../utils/statusCodes/statusCodes";

const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new CustomError(
        messages.wrongCredentials,
        statusCodes.unauthorized
      );
      throw error;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      username: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);

    res.status(statusCodes.ok).json({ token });
  } catch (error) {
    next(error);
  }
};

export default loginUser;
