import { Router } from "express";
import {
  addBook,
  deleteBook,
  getBooks,
} from "../../controllers/booksControllers/booksControllers.js";
import paths from "../../utils/paths/paths.js";
import { validate } from "express-validation";
import addBookSchema from "../../utils/Schemas/addBookSchema.js";

const booksRouter = Router();

booksRouter.get(paths.root, getBooks);

booksRouter.delete(paths.delete, deleteBook);

booksRouter.post(
  paths.add,
  validate(addBookSchema, {}, { abortEarly: false }),
  addBook
);

export default booksRouter;
