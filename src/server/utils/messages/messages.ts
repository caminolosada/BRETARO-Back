import { type MessagesStructure } from "../types";

const messages: MessagesStructure = {
  wrongCredentials: "Wrong credentials",
  pong: "🏓 Pong",
  notFound: "Endpoint not found",
  internalServerError: "Internal server error",
  badRequest: {
    username: "username is not allowed to be empty",
    password: "password is not allowed to be empty",
  },
  errorDb: "Error connecting to database",
  errorDelete: "Can't delete this book because it doesn't exist",
  bookDeleted: "The book has been deleted",
  errorAdd: "Can't create this book",
  bookAdded: "The book has been created",
};

export default messages;
