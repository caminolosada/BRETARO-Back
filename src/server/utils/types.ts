export interface PathsStructure {
  root: string;
}

export interface MessagesStructure {
  wrongCredentials: string;
  pong: string;
  notFound: string;
  internalServerError: string;
}

export interface StatusStructure {
  ok: number;
  created: number;
  unauthorized: number;
  notFound: number;
  internalServerError: number;
}
