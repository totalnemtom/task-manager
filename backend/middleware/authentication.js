const jwt = require("jsonwebtoken");
const asyncWrapper = require("./async");
const { createCustomError } = require("../errors/custom-errors");
const httpStatusCodes = require("../errors/status-codes");

const config = process.env;

const verifyToken = asyncWrapper(async (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    next(
      createCustomError(
        "forbidden",
        httpStatusCodes.FORBIDDEN,
        true,
        "forbidden"
      )
    );
  }

  const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
  req.user = decoded;

  return next();
});

module.exports = verifyToken;
