class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    this.isOperational = true;

    // use Error.captureStackTrace to clean the stack trace which allows for easier debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
