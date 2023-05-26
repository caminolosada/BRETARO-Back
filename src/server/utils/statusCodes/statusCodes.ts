import { type StatusStructure } from "../types";

const statusCodes: StatusStructure = {
  ok: 200,
  created: 201,
  unauthorized: 401,
  notFound: 404,
  internalServerError: 500,
};

export default statusCodes;
