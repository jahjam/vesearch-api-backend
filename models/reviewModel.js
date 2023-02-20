const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, 'A review must have a rating out of 5'],
    validate: {
      validator: val => val <= 5 && val > 0 && val % 1 === 0,
      message: 'Rating must be between 0 and 5',
    },
  },
  comment: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A review must have an author'],
  },
  recipe: {
    type: mongoose.Schema.ObjectId,
    ref: 'Recipe',
    required: [true, 'A review must have a recipe'],
  },
  date: Date,
});
// populate all queries that begin with 'find'
reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: 'author', select: 'username -_id' });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
