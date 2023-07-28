import { Router } from "express";
import {
  addBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "../../controllers/booksControllers/booksControllers.js";
import paths from "../../utils/paths/paths.js";
import { validate } from "express-validation";
import addBookSchema from "../../utils/Schemas/addBookSchema.js";

const booksRouter = Router();

booksRouter.get(paths.root, getBooks);

booksRouter.get(paths.myBook, getBookById);

booksRouter.delete(paths.delete, deleteBook);

booksRouter.post(
  paths.add,
  validate(addBookSchema, {}, { abortEarly: false }),
  addBook,
);

booksRouter.put("/", updateBook);

export default booksRouter;
