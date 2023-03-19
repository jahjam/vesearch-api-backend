const multer = require('multer');
const crypto = require('crypto');
const sharp = require('sharp');
const Recipe = require('../models/recipeModel');
const AppError = require('../utils/appError');
const QueryFeatures = require('../utils/queryFunctions');
const catchAsync = require('../utils/catchAsync');
const { multerFilter } = require('../utils/multerFilter');

const multerStorage = multer.memoryStorage();

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadRecipePhoto = upload.single('photo');

exports.resizeRecipePhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `recipe-${crypto.randomBytes(12).toString('hex')}.jpeg`;

  sharp(req.file.buffer)
    .resize(1000, 1000)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/recipes/${req.file.filename}`);

  next();
};

exports.setAuthor = (req, res, next) => {
  // req.user.id (id is a getter), so you are not accessing the id property, rather calling a getter on the mongoose document.
  if (!req.body.author) req.body.author = req.user.id;

  next();
};

exports.getAllApprovedRecipes = catchAsync(async (req, res) => {
  // find is used to return all the available recipes in the DB
  const queries = new QueryFeatures(Recipe.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const recipes = await queries.query;

  // only show approved recipes
  const approvedRecipes = recipes.filter(recipe => recipe.isApproved);

  res.status(200).json({
    status: 'success',
    requestedAt: req.timeOfRequest,
    numOfResults: approvedRecipes.length,
    data: {
      recipes: approvedRecipes,
    },
  });
});

exports.getAllUnapprovedRecipes = catchAsync(async (req, res) => {
  const recipes = await Recipe.find();

  // only show unapproved recipes
  const unapprovedRecipes = recipes.filter(recipe => !recipe.isApproved);

  res.status(200).json({
    status: 'success',
    numOfResults: unapprovedRecipes.length,
    data: {
      recipes: unapprovedRecipes,
    },
  });
});

exports.approveRecipe = catchAsync(async (req, res, next) => {
  const approvedRecipe = await Recipe.findByIdAndUpdate(
    req.params.recipeId,
    {
      isApproved: req.body.isApproved,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!approvedRecipe)
    return next(new AppError('No recipe found with that ID', 400));

  res.status(200).json({
    status: 'success',
    data: {
      recipe: approvedRecipe,
    },
  });
});

exports.rejectRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.recipeId);

  if (!recipe) return next(new AppError('No recipe found with that ID', 400));

  res.status(200).send();
});

exports.getOneApprovedRecipe = catchAsync(async (req, res) => {
  // findById is used to find the recipe by a given ID
  const recipe = await Recipe.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      recipe,
    },
  });
});

exports.addRecipe = catchAsync(async (req, res, next) => {
  if (req.body.isApproved === 'true')
    return next(
      new AppError(
        'Restricted field! Recipes can only be approved by an admin.',
        401
      )
    );

  req.body.nutrition = JSON.parse(req.body.nutrition);
  req.body.ingredients = JSON.parse(req.body.ingredients);
  req.body.methods = JSON.parse(req.body.methods);
  req.body.nutritionProvided = JSON.parse(req.body.nutritionProvided);
  req.body.methodsProvided = JSON.parse(req.body.methodsProvided);

  // BUG
  // remove this before production
  req.body.isApproved = true;

  if (req.file) {
    req.body.coverImage = req.file.filename;
  }

  if (!req.body.nutritionProvided) {
    delete req.body.nutrition;
  }

  if (req.body.methodsProvided) {
    delete req.body.methodsAlternative;
  } else {
    delete req.body.methods;
  }

  // used create on the recipe object to store req in mongoDB
  const newRecipe = await Recipe.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      recipe: newRecipe,
    },
  });
});

exports.editRecipe = catchAsync(async (req, res, next) => {
  if (req.body.isApproved === 'true')
    return next(
      new AppError(
        'Restricted field! Recipes can only be approved by an admin.',
        401
      )
    );

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      // returns the newly edited document
      new: true,
      // applied the validators to the updated fields
      runValidators: true,
    }
  );

  res.status(201).json({
    status: 'success',
    data: {
      recipe: updatedRecipe,
    },
  });
});

exports.deleteRecipe = catchAsync(async (req, res, next) => {
  const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

  if (!deletedRecipe) {
    return next(
      new AppError(`No tour found with that ID: ${req.params.id}`),
      404
    );
  }

  res.status(204).send();
});

exports.findByTag = catchAsync(async (req, res, next) => {
  const { tagName } = req.params;
  const allowedTags = process.env.ALLOWED_RECIPE_TAGS.split(',');

  if (!allowedTags.includes(tagName))
    return next(
      new AppError(
        `${tagName} is not a valid tag name, please refer to documentation for valid tag names`,
        400
      )
    );

  const recipes = await Recipe.find({
    $expr: { $in: [tagName, '$dietTags'] },
  });

  res.status(201).json({
    status: 'success',
    numOfResults: recipes.length,
    data: {
      recipes,
    },
  });
});

exports.statsByDifficulty = catchAsync(async (req, res, next) => {
  const recipes = await Recipe.aggregate([
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numRecipes: { $sum: 1 },
        avgCookTime: { $avg: '$cookTime' },
        avgPrepTime: { $avg: '$prepTime' },
        avgServings: { $avg: '$servings' },
        numIngredients: { $avg: { $size: '$ingredients' } },
      },
    },
    {
      $sort: { numRecipes: 1 },
    },
  ]);

  res.status(201).json({
    status: 'success',
    data: {
      recipes,
    },
  });
});
