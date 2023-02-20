class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    // set status code on error to one passed in
    this.statusCode = statusCode;
    // set the status depending on what code is passed in
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // create an isOperational property to determine if error is thrown by us
    this.isOperational = true;

    // use Error.captureStackTrace to clean the stack trace which allows for easier debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
