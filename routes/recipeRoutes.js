const express = require('express');
const {
  getAllApprovedRecipes,
  getAllUnapprovedRecipes,
  addRecipe,
  getOneApprovedRecipe,
  editRecipe,
  deleteRecipe,
  findByTag,
  statsByDifficulty,
  setAuthor,
  approveRecipe,
  rejectRecipe,
  uploadRecipePhoto,
  resizeRecipePhoto,
} = require('../controllers/recipeControllers');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

// creates a mountable router to utilise mounting methods
const router = express.Router();

// we can use 'use' on a route to 'reroute' a route LOL.
router.use('/:recipeId/reviews', reviewRouter);

router.route('/findByTag/:tagName').get(protect, findByTag);

router.route('/statsByDifficulty').get(protect, statsByDifficulty);

// Restricted to ADMIN
router
  .route('/unapprovedRecipes')
  .get(protect, restrictTo('admin'), getAllUnapprovedRecipes);

router
  .route('/unapprovedRecipes/:recipeId')
  .patch(protect, restrictTo('admin'), approveRecipe)
  .delete(protect, restrictTo('admin'), rejectRecipe);

// we use the route method on router to chain get and post requests to the specific route
router
  .route('/')
  .get(getAllApprovedRecipes)
  .post(protect, uploadRecipePhoto, resizeRecipePhoto, setAuthor, addRecipe);

router
  .route('/:id')
  .get(getOneApprovedRecipe)
  .patch(protect, editRecipe)
  .delete(protect, restrictTo('admin'), deleteRecipe);

module.exports = router;
