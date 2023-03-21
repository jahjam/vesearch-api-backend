const AppError = require('../utils/appError');

const handleCastErrorDB = err =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateFieldsDB = err =>
  new AppError(
    `${err.keyValue.name} is already taken. Please use another value.`,
    400
  );

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(val => val.message);

  return new AppError(`Invalid input data. ${errors.join('. ')}`, 400);
};

const handleQueryErrorDB = err =>
  new AppError(
    `Invalid query name: ${err.path}, please try another query.`,
    400
  );

const handleJWTerror = () =>
  new AppError('Something went wrong! Please sign in again.', 401);

const handleJWTExpiredError = () =>
  new AppError('Your session has expired! Please log in again.', 401);

const sendDevelopmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProductionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Oops, something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendDevelopmentError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    // 'CastError' generally means incorrect route
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    // 11000 code generally means you're entering a duplicate field
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    // 'ValidationError' generally means there's an error in one of the validators within the schema
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    // if query is invalid
    if (err.isImmutableError === false) error = handleQueryErrorDB(error);
    // if JWT is invalid
    if (err.name === 'JsonWebTokenError') error = handleJWTerror();
    // if JWT has timedout
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    // finally we send the formatted error to the error function
    sendProductionError(error, res);
  }
};
