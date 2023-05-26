import { Types } from "mongoose";
import { type UserData } from "../types/types.js";

export interface CustomResponse {
  status: number;
  body: {
    mesage: string;
  };
}

export const mockedUser: UserData = {
  _id: new Types.ObjectId().toString(),
  username: "camino",
  password: "camino1234",
};

export const mockedToken = "lskdnflskdnf";
