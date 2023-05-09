const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const { multerFilter } = require('../utils/multerFilter');
const Email = require('../utils/email');

const multerStorage = multer.memoryStorage();

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  // req.file.filename = `user-${req.user.id}.jpeg`;
  req.file.filename = `default.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 80 })
    .toFile(`${__dirname}/../public/imgs/${req.file.filename}`);

  next();
};

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .populate('recipes')
    .populate('bookmarks');

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirmation)
    return next(
      new AppError('Please use the /updateMyPassword route to update passwords')
    );

  const filteredBody = req.file
    ? { photo: req.file.filename }
    : { username: req.body.username, email: req.body.email };

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  })
    .populate('recipes')
    .populate('bookmarks');

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.addBookmark = catchAsync(async (req, res, next) => {
  if (!req.params.recipeId)
    return next(new AppError('Please provide a recipe ID to bookmark'));

  const bookmarkExists = req.user.bookmarks.some(bookmarkId =>
    bookmarkId.equals(req.params.recipeId)
  );

  if (bookmarkExists)
    return res.status(200).json({
      status: 'success',
      data: {
        user: req.user,
      },
    });

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { $push: { bookmarks: req.params.recipeId } },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate('recipes')
    .populate('bookmarks');

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.removeBookmark = catchAsync(async (req, res, next) => {
  if (!req.params.recipeId)
    return next(new AppError('Please provide a recipe ID to bookmark'));

  const bookmarkDoesntExists = !req.user.bookmarks.some(bookmarkId =>
    bookmarkId.equals(req.params.recipeId)
  );

  if (bookmarkDoesntExists)
    return res.status(200).json({
      status: 'success',
      data: {
        user: req.user,
      },
    });

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { bookmarks: mongoose.Types.ObjectId(req.params.recipeId) },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate('recipes')
    .populate('bookmarks');

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  user.flaggedForDeletion = true;
  user.daysUntilDeletion = process.env.DAYS_UNTIL_DELETION;
  await user.save({ validateBeforeSave: false });

  try {
    const deletionURL = `${req.protocol}://${req.get('host')}`;
    await new Email(user, deletionURL).sendGoodbye();

    res.status(200).json({
      status: 'success',
      message: `User will be deleted in ${user.daysUntilDeletion} days. If you change your mind, please log in again to cancel this process. After 14 days your account will be deleted for good.`,
    });
  } catch (err) {
    return next(
      new AppError(
        'There was an error sending your account deletion confirmation email.',
        500
      )
    );
  }
});

// TODO
// Add an admin page to manage users in app
exports.getAllUsers = () => {};
exports.getUser = () => {};
exports.createUser = () => {};
exports.updateUser = () => {};
exports.deleteUser = () => {};
