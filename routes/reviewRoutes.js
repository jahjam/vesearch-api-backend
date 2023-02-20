const express = require('express');
const {
  addReview,
  getAllReviews,
  ratingsAverage,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/ratingsAverage/:recipeId').get(ratingsAverage);

// the rerouted route from the recipe route will come in here along with the params
router
  .route('/')
  .post(protect, addReview)
  .get(protect, restrictTo('admin'), getAllReviews);

module.exports = router;
