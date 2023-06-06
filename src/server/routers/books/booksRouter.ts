import { Router } from "express";
import {
  deleteBook,
  getBooks,
} from "../../controllers/booksControllers/booksControllers.js";
import paths from "../../utils/paths/paths.js";

const booksRouter = Router();

booksRouter.get(paths.root, getBooks);

booksRouter.delete(paths.delete, deleteBook);

export default booksRouter;
