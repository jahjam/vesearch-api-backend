const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const crypto = require('crypto');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');
const { decipheredEmail } = require('../utils/decipherField');

const signJWT = id =>
  jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createAndSendJWT = (user, statusCode, req, res) => {
  const jwt = signJWT(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  user.password = undefined;
  user.flaggedForDeletion = undefined;

  res.cookie('jwt', jwt, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    jwt: process.env.NODE_ENV === 'development' ? jwt : undefined,
    data: {
      user,
    },
  });
};

exports.whoAmI = async (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    res.status(204).json({
      status: 'Success',
    });
    return;
  }

  const decodedJWT = await promisify(jsonwebtoken.verify)(
    jwt,
    process.env.JWT_SECRET
  );

  const validatedUser = await User.findById(decodedJWT.id)
    .select('+passwordChangedAt')
    .populate('recipes')
    .populate('bookmarks');

  console.log(validatedUser);

  if (!validatedUser)
    return next(new AppError('This user cannot be found.', 401));

  if (validatedUser.changedPasswordAfter(decodedJWT.iat))
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );

  createAndSendJWT(validatedUser, 200, req, res);
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    joinDate: Date.now(),
    username: req.body.username,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
  });

  createAndSendJWT(newUser, 200, req, res);
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(
      new AppError(`Please enter your ${!email ? 'email' : 'password.'}`, 400)
    );

  const user = await User.findOne({ email: decipheredEmail(email) })
    .select('+password +flaggedForDeletion')
    .populate('recipes');

  const passwordValidation = async () =>
    await bcrypt.compare(password, user.password);

  if (!user || !(await passwordValidation()))
    return next(
      new AppError('Incorrect email or password, please try again!', 401)
    );

  if (user.flaggedForDeletion) {
    user.flaggedForDeletion = false;
    user.daysUntilDeletion = undefined;
    await user.save({ validateBeforeSave: false });
  }

  createAndSendJWT(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'null', {
    expires: new Date(Date.now() - 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  let jwt;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    jwt = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    // eslint-disable-next-line prefer-destructuring
    jwt = req.cookies.jwt;
  }

  if (!jwt)
    return next(
      new AppError(
        'Sorry, you do not have authorisation to access this page.',
        401
      )
    );

  const decodedJWT = await promisify(jsonwebtoken.verify)(
    jwt,
    process.env.JWT_SECRET
  );

  const validatedUser = await User.findById(decodedJWT.id).select(
    '+passwordChangedAt'
  );

  if (!validatedUser)
    return next(new AppError('This user cannot be found.', 401));

  if (validatedUser.changedPasswordAfter(decodedJWT.iat))
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );

  req.user = validatedUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action.', 403)
      );
    }

    next();
  };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: decipheredEmail(req.body.email) });

  if (!user)
    return next(new AppError('Sorry, no user was found by that email.', 404));

  const resetToken = user.createPasswordResetToken();
  // validation must be turned off as we are saving new user information and this will trigger them requiring password confirmation.
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/new-password/${resetToken}`;

    await new Email(user, resetURL).sendPasswordResetLink();

    res.status(200).json({
      status: 'success',
      message: `A password reset link was sent to ${user.email}`,
    });
  } catch (err) {
    // if there is an error sending the email (within the email provider etc), reset token as it is unnecassary to have unusable tokens in the database
    user.passwordResetToken = undefined;
    user.passwordResetExpiryDate = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Please try again later.',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  console.log(req.params.jwt);
  // this should create an identical token to the one created for the user when the token was request, if token is not identical, it's not the correct token.
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.jwt)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiryDate: { $gt: Date.now() },
  });

  console.log(user);

  if (!user)
    return next(new AppError('Reset link is invalid or has expired', 400));

  const jwt = signJWT(user._id);

  // we decode the jwt immediately here to ensure the jwt and password changed at date align
  const decodedJWT = await promisify(jsonwebtoken.verify)(
    jwt,
    process.env.JWT_SECRET
  );

  user.savePasswordChangedAtDate(decodedJWT.iat);
  user.password = req.body.password;
  user.passwordConfirmation = req.body.passwordConfirmation;
  user.passwordResetToken = undefined;
  user.passwordResetExpiryDate = undefined;
  await user.save();

  res.status(200).json({
    status: 'success',
    jwt: process.env.NODE_ENV === 'development' ? jwt : undefined,
    message: 'Password was reset.',
  });
});
