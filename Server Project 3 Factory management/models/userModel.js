const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true,unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: String,
    NumumOfActions: Number,
  },
  { versionKey: false }
);

const User = mongoose.model("user", userSchema, "users");

module.exports = User;
