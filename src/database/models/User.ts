import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    min: 5,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
});

const User = model("User", userSchema, "users");

export default User;
