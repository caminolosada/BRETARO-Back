export interface PathsStructure {
  root: string;
  user: string;
  login: string;
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
}

export interface StatusStructure {
  ok: number;
  created: number;
  badRequest: number;
  unauthorized: number;
  notFound: number;
  internalServerError: number;
}