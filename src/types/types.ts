import { type Request } from "express";
import { type Types } from "mongoose";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserData extends UserCredentials {
  _id: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export interface BookStructure {
  title: string;
  author: string;
  frontPage: string;
  publicationYear: string;
  editorial: string;
  status: string;
  rating: number;
  destination: string;
  cosmos: string;
}

export interface BookDocumentStructure extends BookStructure {
  _id: Types.ObjectId;
}

export interface BookToUpdateStructure extends BookStructure {
  id: string;
}

export interface CustomRequest extends Request {
  body: BookStructure;
  query: {
    limit?: string;
    status?: string;
  };
}

export interface CustomUpdateRequest extends Request {
  body: BookToUpdateStructure;
}
