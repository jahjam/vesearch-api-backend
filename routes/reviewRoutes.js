const express = require('express');
const {
    addReview,
    getAllReviews,
    ratingsAverage,
    deleteOneReview,
    calculateAverageRating,
} = require('../controllers/reviewController');
const {protect} = require('../controllers/authController');

const router = express.Router({mergeParams: true});

router.route('/ratingsAverage/:recipeId').get(ratingsAverage);

router.route('/:review_id').delete(protect, deleteOneReview);

// the rerouted route from the recipe route will come in here along with the params
router.route('/').post(protect, calculateAverageRating, addReview).get(protect, getAllReviews);

module.exports = router;
