import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  frontPage: {
    type: String,
    required: true,
  },
  publicationYear: String,
  editorial: String,
  status: {
    type: Boolean,
    required: true,
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  destination: {
    type: String,
    enum: ["keep", "borrowed", "get rid"],
    required: true,
  },
  cosmos: String,
});

const Book = model("Book", bookSchema, "books");

export default Book;
