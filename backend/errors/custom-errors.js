class BaseError extends Error {
  constructor(name, statusCode, isOperational, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

const createCustomError = (name, statusCode, isOperational, description) => {
  return new BaseError(name, statusCode, isOperational, description);
};

module.exports = {
  createCustomError,
  BaseError,
};
