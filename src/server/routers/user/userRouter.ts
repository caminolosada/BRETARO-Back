import { Router } from "express";
import { validate } from "express-validation";
import paths from "../../utils/paths/paths.js";
import loginUser from "../../controllers/loginUser/loginUser.js";
import loginSchema from "../../utils/Schemas/loginSchema.js";

const userRouter = Router();

userRouter.post(
  paths.login,
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
