const bcrypt = require("bcryptjs");
const User = require("../models/user");
const asyncWrapper = require("../middleware/async");
const Logger = require("../winston/logger");
const { createCustomError } = require("../errors/custom-errors");
const httpStatusCodes = require("../errors/status-codes");
const { signToken } = require("../lib/token/token");

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

  const token = signToken(user);

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

  return res.status(201).json(user);
});

const getUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email && password)) {
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

  const user = await User.findOne({ email });

  if (email && (await bcrypt.compare(password, user.password))) {
    const token = signToken(user);

    user.token = token;

    return res.status(200).json(user);
  }

  res.status(401).send("Invalid Credentials");
});

module.exports = {
  postUser,
  getUser,
};
