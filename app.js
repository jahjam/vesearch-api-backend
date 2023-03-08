// xss clean prevents code from being written into request body
const xss = require('xss-clean');
// allow requests
const cors = require('cors');
// simple scheduler for node
const schedule = require('node-schedule');
// mongoSanitize removes mongo operators from request body to prevent code injection
const mongoSanitize = require('express-mongo-sanitize');
// import rate limit to prevent against brute force attacks
const rateLimit = require('express-rate-limit');
// Proves whitelist to prevent parameter pollution
const hpp = require('hpp');
// provides a cookie property on the request object
const cookieParser = require('cookie-parser');
// encodes data into a smaller size to decrease bandwidth and make app faster
const compression = require('compression');
// header security middleware wrapper
const helmet = require('helmet');
// format date
const dateFns = require('date-fns');
// morgan for logging
const morgan = require('morgan');
// import express on top of node.js
const express = require('express');
// establish express with 'app'
const app = express();
// import the router for recipes
const recipeRoute = require('./routes/recipeRoutes');
// import the router for users
const userRoute = require('./routes/userRoutes');
// import user model
const User = require('./models/userModel');
// import the router for reviews
const reviewRoute = require('./routes/reviewRoutes');
// import custom error middleware
const globalErrorMiddleware = require('./middleware/errorMiddleware');
// import custom error object
const AppError = require('./utils/appError');

app.use(cors());

app.options('*', cors());

// sets some blanket security headers (is a wrapper for many smaller middlewares)
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// middleware
// only use morgan logger in development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('common'));
}

// prevents from brute force attacks by limiting amount of requests able to be made
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour.',
});

app.use('/api', limiter);

// give us access to the request body when sent in JSON form
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whiteList: ['cookTime', 'prepTime'],
  })
);

app.use(compression());

// create a time of request property on the request object
app.use((req, res, next) => {
  req.timeOfRequest = dateFns.format(new Date(), 'dd/MM/yyyy hh:mm:ssa OOOO');
  next();
});

schedule.scheduleJob('* */24 * * *', async () => {
  const deletionData = await User.deleteMany({
    daysUntilDeletion: { $lte: 0 },
  });

  console.log('Number of users deleted today:', deletionData.deletedCount);

  const usersForDeletion = await User.find({
    daysUntilDeletion: {
      $exists: true,
    },
  });

  if (!usersForDeletion.length) return;

  usersForDeletion.forEach(async user => {
    const foundUser = await User.findById(user.id).populate(
      'daysUntilDeletion'
    );

    foundUser.daysUntilDeletion--;
    await foundUser.save({ validateBeforeSave: false });
  });
});

app.use('/public', express.static(`${__dirname}/public`));
app.use('/views', express.static(`${__dirname}/views`));

// app generic routes
app.use(`/api/v${process.env.API_VERSION}/recipes`, recipeRoute);
app.use(`/api/v${process.env.API_VERSION}/users`, userRoute);
app.use(`/api/v${process.env.API_VERSION}/reviews`, reviewRoute);

// middleware to capture any requests that don't match any routes and send appropriate error response
app.all('*', (req, res, next) =>
  // using our custom error middleware to throw a new error and using the originalUrl to refer it back to the client
  next(new AppError(`${req.originalUrl} is not available on this server`, 404))
);

// this will capture all errors so that we can handle them appropriately
app.use(globalErrorMiddleware);

// export app for use in server
module.exports = app;
