const { CustomAPIError } = require("../errors/custom-errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ err: err.message });
  }
  return res.status(err.status).json({ err: err.message });
};

module.exports = errorHandlerMiddleware;
