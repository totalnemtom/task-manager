const mongoose = require("mongoose");
const validateEmail = require("../lib/user/validation");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "you must provide your first name!"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "you must provide your last name!"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "you must provide a username!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "you must provide an email!"],
    trim: true,
    unique: true,
    validate: [validateEmail, "please provide a valid email addres!"],
  },
  password: {
    type: String,
    required: [true, "you must provide a password!"],
    trim: true,
  },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);
