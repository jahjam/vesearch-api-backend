const mongoose = require('mongoose');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.addReview = catchAsync(async (req, res, next) => {
  const review = await Review.create({
    rating: req.body.rating,
    comment: req.body.comment,
    author: req.user.id,
    date: Date.now(),
    recipe: req.params.recipeId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      review,
      user: req.user,
    },
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.params.recipeId) filter = { recipe: req.params.recipeId };

  const reviews = await Review.find(filter);

  res.status(201).json({
    status: 'success',
    data: {
      reviews,
    },
  });
});

exports.ratingsAverage = catchAsync(async (req, res, next) => {
  const { ObjectId } = mongoose.Types;

  const ratings = await Review.aggregate([
    { $match: { recipe: ObjectId(req.params.recipeId) } },
    {
      $group: {
        _id: null,
        avgRatings: { $avg: '$rating' },
      },
    },
  ]);

  res.status(201).json({
    status: 'success',
    data: {
      ratings,
    },
  });
});
