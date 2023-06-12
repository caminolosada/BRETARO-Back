export interface PathsStructure {
  root: string;
  user: string;
  login: string;
  books: string;
  delete: string;
  add: string;
  myBook: string;
}

export interface MessagesStructure {
  wrongCredentials: string;
  pong: string;
  notFound: string;
  internalServerError: string;
  badRequest: {
    username: string;
    password: string;
  };
  errorDb: string;
  errorDelete: string;
  bookDeleted: string;
  errorAdd: string;
  bookAdded: string;
  bookNotFound: string;
}

export interface StatusStructure {
  ok: number;
  created: number;
  badRequest: number;
  unauthorized: number;
  notFound: number;
  internalServerError: number;
}
