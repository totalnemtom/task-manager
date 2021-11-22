const mongoose = require("mongoose");

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

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

module.exports = mongoose.model("user", userSchema);
