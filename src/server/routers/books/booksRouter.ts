import { Router } from "express";
import getBooks from "../../controllers/booksControllers/booksControllers";

const booksRouter = Router();

booksRouter.get("/", getBooks);

export default booksRouter;
