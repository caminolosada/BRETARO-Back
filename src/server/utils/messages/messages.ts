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
};

export default messages;
