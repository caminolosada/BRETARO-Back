import { Router } from "express";
import {
  addBook,
  deleteBook,
  getBooks,
} from "../../controllers/booksControllers/booksControllers.js";
import paths from "../../utils/paths/paths.js";

const booksRouter = Router();

booksRouter.get(paths.root, getBooks);

booksRouter.delete(paths.delete, deleteBook);

booksRouter.post(paths.add, addBook);

export default booksRouter;
