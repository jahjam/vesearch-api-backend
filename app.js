const xss = require('xss-clean');
const cors = require('cors');
const schedule = require('node-schedule');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const dateFns = require('date-fns');
const morgan = require('morgan');
const express = require('express');
const recipeRoute = require('./routes/recipeRoutes');
const userRoute = require('./routes/userRoutes');
const User = require('./models/userModel');
const reviewRoute = require('./routes/reviewRoutes');
const globalErrorMiddleware = require('./middleware/errorMiddleware');
const AppError = require('./utils/appError');

const app = express();

app.use(
  cors({
    origin: ['https://vesearch-app.onrender.com', 'http://localhost:3000'],
    credentials: true,
  })
);

app.options('*', cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('common'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour.',
});

app.use('/api', limiter);

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

app.use((req, res, next) => {
  req.timeOfRequest = dateFns.format(new Date(), 'dd/MM/yyyy hh:mm:ssa OOOO');
  next();
});

schedule.scheduleJob('* * */24 * *', async () => {
  await User.deleteMany({
    daysUntilDeletion: { $lte: 0 },
  });

  // TODO
  // Make a logger

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

// app generic routes
app.use(`/api/v${process.env.API_VERSION}/recipes`, recipeRoute);
app.use(`/api/v${process.env.API_VERSION}/users`, userRoute);
app.use(`/api/v${process.env.API_VERSION}/reviews`, reviewRoute);

app.all('*', (req, res, next) =>
  next(new AppError(`${req.originalUrl} is not available on this server`, 404))
);

app.use(globalErrorMiddleware);

module.exports = app;
