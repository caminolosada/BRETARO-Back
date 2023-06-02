import "../loadEnvironment.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { generalError, notFoundError } from "./middleware/errorMiddleware.js";
import { pingController } from "./controllers/ping/pingController.js";
import paths from "./utils/paths/paths.js";
import userRouter from "./routers/user/userRouter.js";
import booksRouter from "./routers/books/booksRouter.js";

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN_DEV!,
  process.env.ALLOWED_ORIGIN_PROD!,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export const app = express();

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.get(paths.root, pingController);

app.use(paths.books, booksRouter);

app.use(paths.user, userRouter);

app.use(notFoundError);
app.use(generalError);
