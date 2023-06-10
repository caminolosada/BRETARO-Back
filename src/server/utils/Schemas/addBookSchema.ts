import { Joi } from "express-validation";
import { type BookStructure } from "../../../types/types";

const addBookSchema = {
  body: Joi.object<BookStructure>({
    title: Joi.string().required(),
    author: Joi.string().required(),
    frontPage: Joi.string().required(),
    publicationYear: Joi.string().required(),
    editorial: Joi.string().required(),
    status: Joi.boolean().required(),
    rating: Joi.number(),
    destination: Joi.string().required(),
    cosmos: Joi.string(),
  }),
};

export default addBookSchema;
