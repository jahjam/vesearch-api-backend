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

// this is the response we want to get back if we are working in a development environment
const sendDevelopmentError = (err, res) => {
  // this error will be sent during development with as much information as possible to help the developer debug (development is the safe environment)
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// this is the response we want to get back if we are working in a production environment (where as little information should be sent to the client as possible)
const sendProductionError = (err, res) => {
  // operational, trusted error that we have purposefully thrown in our code (created within the error object)
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // this error will be sent during production if there is a bug in our code or in an included library so not to leak any potentially senstive code to the client
    res.status(500).json({
      status: 'error',
      message: 'Oops, something went wrong!',
    });
  }
};

// if function receives four arguments in express it is taken to mean it's for handling errors and err is then the first argument
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // if app in development call relevent error function
  if (process.env.NODE_ENV === 'development') {
    sendDevelopmentError(err, res);
    // if app in production call relevent error function
  } else if (process.env.NODE_ENV === 'production') {
    // it's not good practice to mutate a function argument
    let error = { ...err };
    error.message = err.message;

    // 'CastError' generally means incorrect route
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    // 11000 code generally means you're enterring a duplicate field
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    // 'ValidationError' generally means there's an error in one of the validators within the schema
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    // if query is invalid
    if (err.isImmutableError === false) error = handleQueryErrorDB(error);
    // if JWT is invalid
    if (err.name === 'JsonWebTokenError') error = handleJWTerror();
    // if JWT as timedout
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    // finally we send the formatted error to the error function
    sendProductionError(error, res);
  }
};
