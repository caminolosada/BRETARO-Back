import "../loadEnvironment.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";

const allowedOrigins = process.env.ALLOWED_ORIGIN_DEV!;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export const app = express();

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());
