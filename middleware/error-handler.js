const { BaseError } = require("../errors/custom-errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({ err: err.message });
  }
  console.log(err);
  return res.status(err.status).json({ err: err.message });
};

module.exports = errorHandlerMiddleware;
