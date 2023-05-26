import "../loadEnvironment.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { validate } from "express-validation";
import { generalError, notFoundError } from "./middleware/errorMiddleware.js";
import { pingController } from "./controllers/ping/pingController.js";
import paths from "./utils/paths/paths.js";
import loginSchema from "./utils/Schemas/loginSchema.js";
import loginUser from "./controllers/loginUser/loginUser.js";

const allowedOrigins = process.env.ALLOWED_ORIGIN_DEV!;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export const app = express();

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.get(paths.root, pingController);

app.post(
  paths.login,
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

app.use(notFoundError);
app.use(generalError);
