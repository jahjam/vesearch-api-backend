const mongoose = require('mongoose');
const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Recipe = require("../models/recipeModel");

exports.calculateAverageRating = catchAsync(async (req, res, next) => {
    const {ObjectId} = mongoose.Types;

    const ratings = await Review.aggregate([
        {$match: {recipe: ObjectId(req.params.recipeId)}},
        {
            $group: {
                _id: null,
                avgRatings: {$avg: '$rating'},
            },
        },
    ]);

    await Recipe.findByIdAndUpdate(
        req.params.recipeId,
        {
            ratingsAverage: ratings[0].avgRatings,
        }, {
            new: true,
        }
    );

    next();
})

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
        },
    });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
    let filter = {};

    if (req.params.recipeId) filter = {recipe: req.params.recipeId};

    const reviews = await Review.find(filter);

    res.status(201).json({
        status: 'success',
        data: {
            reviews,
        },
    });
});

exports.deleteOneReview = catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.review_id);

    if (!review) {
        return next(new AppError('No review by that ID', 404));
    }

    if (req.user.id !== review?.author.id)
        return next(
            new AppError('You do not have permission to perform this action', 403)
        );

    await Review.findByIdAndDelete(review.id);

    res.status(204).send();
});

exports.ratingsAverage = catchAsync(async (req, res, next) => {
    const {ObjectId} = mongoose.Types;

    const ratings = await Review.aggregate([
        {$match: {recipe: ObjectId(req.params.recipeId)}},
        {
            $group: {
                _id: null,
                avgRatings: {$avg: '$rating'},
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
