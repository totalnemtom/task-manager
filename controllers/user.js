const User = require("../models/user");
const asyncWrapper = require("../middleware/async");
const Logger = require("../winston/logger");
const { createCustomError } = require("../errors/custom-errors");
const httpStatusCodes = require("../errors/status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postUser = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (!(firstName && lastName && username && email && password)) {
    next(
      createCustomError(
        "all data must be provided!",
        httpStatusCodes.BAD_REQUEST,
        true,
        "Please provide all data!"
      ),
      Logger.log("error", "all data must be provided!")
    );
  }

  const oldUser = await User.findOne({ email });

  if (oldUser) {
    next(
      createCustomError(
        "email already exists",
        httpStatusCodes.CONFLICT,
        true,
        "Email already exists!"
      ),
      Logger.log("error", "email already exists")
    );
  }

  encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    username,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  const token = jwt.sign(
    { user_id: user._id, email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "2h",
    }
  );

  if (!token) {
    next(
      createCustomError(
        "unotharized",
        httpStatusCodes.UNOTHARIZED,
        true,
        "Unotharized"
      ),
      Logger.log("error", "unotharized")
    );
  }

  user.token = token;

  res.status(201).json(user);
});

module.exports = {
  postUser,
};
