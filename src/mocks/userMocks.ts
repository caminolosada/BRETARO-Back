import { type UserCredentials } from "../types/types";

export const mockedUserHashed: UserCredentials = {
  username: "caminola",
  password: "$2y$10$lzIAK9MysuImKiqra6ZiNO2eq4Nvxx8qOTisnPUODiNB92v5dnkxK",
};

export const mockedUserCredentials: UserCredentials = {
  username: "caminola",
  password: "caminola",
};

export const wrongMockedUserCredentials: UserCredentials = {
  username: "camin",
  password: "caminola",
};

export const mockedIncompleteCredentials = {
  username: "caminola",
};
