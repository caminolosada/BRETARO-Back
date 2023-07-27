import { type PathsStructure } from "../types";

const paths: PathsStructure = {
  root: "/",
  user: "/user",
  login: "/login",
  books: "/books",
  delete: "/delete/:id",
  add: "/add",
  myBook: "/:id",
  update: "/update",
};

export default paths;
