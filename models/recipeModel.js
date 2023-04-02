const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

// prevents incorrect query names from still showing results
mongoose.set('strictQuery', 'throw');

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '(Name error) A recipe must have a name'],
      unique: true,
      trim: true,
      maxLength: [
        40,
        '(Name error) A recipe name must have less than 40 characters',
      ],
      minLength: [
        5,
        '(Name error) A recipe name must have more than 10 characters',
      ],
    },
    slug: {
      type: String,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A recipe must have an author'],
    },
    prepTime: {
      type: Number,
      required: [
        true,
        '(Preperation time error) A recipe must have a preration time',
      ],
    },
    cookTime: {
      type: Number,
      required: [true, '(Cook time error) A recipe must have a cook time'],
    },
    difficulty: {
      type: String,
      required: [true, '(Difficulty error) A recipe must have a difficulty'],
      enum: {
        values: [
          'novice',
          'beginner',
          'competent',
          'proficient',
          'master chef',
        ],
        message:
          '(Difficulty error) Difficulty must be either "novice", "beginner", "competent", "proficient", "master chef"',
      },
    },
    servings: {
      type: Number,
      required: [
        true,
        '(Servings error) A recipe must have a number of serving',
      ],
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    dietTags: {
      type: [String],
      enum: {
        values: process.env.ALLOWED_RECIPE_TAGS.split(','),
        message:
          '(Diet-tag error) Diet tags are currently restricted to: "oil-free", "gluten-free", "low-cal", "nut-free", "soy-free", "sugar-free", "keto", "raw", "junk-food"',
      },
    },
    nutritionProvided: {
      type: Boolean,
      required: [
        true,
        '(Nutrition provided error) Please tell us whether you are providing nutritional information',
      ],
    },
    nutrition: {
      type: {
        kcal: {
          amount: {
            type: Number,
            required: [
              true,
              '(Nutrition error) A recipe must have all nutrition fields completed [kcal]',
            ],
          },
          measurement: {
            type: String,
            required: [
              true,
              '(Nutrition error) A recipe nutrient must have a measurement defined [kcal]',
            ],
          },
        },
        fat: {
          amount: {
            type: Number,
            required: [
              true,
              '(Nutrition error) A recipe must have all nutrition fields completed [fat]',
            ],
          },
          measurement: {
            type: String,
            required: [
              true,
              '(Nutrition error) A recipe nutrient must have a measurement defined [fat]',
            ],
          },
        },
        saturates: {
          amount: {
            type: Number,
            required: [
              true,
              '(Nutrition error) A recipe must have all nutrition fields completed [saturates]',
            ],
          },
          measurement: {
            type: String,
            required: [
              true,
              '(Nutrition error) A recipe nutrient must have a measurement defined [saturates]',
            ],
          },
        },
        carbs: {
          amount: {
            type: Number,
            required: [
              true,
              '(Nutrition error) A recipe must have all nutrition fields completed [carbs]',
            ],
          },
          measurement: {
            type: String,
            required: [
              true,
              '(Nutrition error) A recipe nutrient must have a measurement defined [carbs]',
            ],
          },
        },
        sugars: {
          amount: {
            type: Number,
            required: [
              true,
              '(Nutrition error) A recipe must have all nutrition fields completed [sugars]',
            ],
          },
          measurement: {
            type: String,
            required: [
              true,
              '(Nutrition error) A recipe nutrient must have a measurement defined [sugars]',
            ],
          },
        },
        fibre: {
          amount: {
            type: Number,
            required: [
              true,
              '(Nutrition error) A recipe must have all nutrition fields completed [fibre]',
            ],
          },
          measurement: {
            type: String,
            required: [
              true,
              '(Nutrition error) A recipe nutrient must have a measurement defined [fibre]',
            ],
          },
        },
        protien: {
          amount: {
            type: Number,
            required: [
              true,
              '(Nutrition error) A recipe must have all nutrition fields completed [protien]',
            ],
          },
          measurement: {
            type: String,
            required: [
              true,
              '(Nutrition error) A recipe nutrient must have a measurement defined [protien]',
            ],
          },
        },
        salt: {
          amount: {
            type: Number,
            required: [
              true,
              '(Nutrition error) A recipe must have all nutrition fields completed [salt]',
            ],
          },
          measurement: {
            type: String,
            required: [
              true,
              '(Nutrition error) A recipe nutrient must have a measurement defined [salt]',
            ],
          },
        },
      },
      required: [
        function () {
          return this.nutritionProvided;
        },
        '(Nutrition provided error) If not providing nutritional information, please unselect nutrition provided',
      ],
    },
    ingredients: {
      type: [
        {
          amount: {
            type: Number,
            required: [
              true,
              '(Ingredient error) A recipe ingedient must have an amount number, [such as 150]',
            ],
          },
          measurement: {
            type: String,
            required: [
              true,
              '(Ingredient error) A recipe ingedient must have a measurement, such as [g, tsp, large]',
            ],
          },
          name: {
            type: String,
            required: [
              true,
              '(Ingredient error) A recipe ingedient must have a name',
            ],
          },
        },
      ],
      required: [
        true,
        '(Ingredient error) A recipe must contain at least one ingredient',
      ],
    },
    methodsProvided: {
      type: Boolean,
      required: [
        true,
        '(Methods provided error) Please tell us whether you are providing any recipe methods',
      ],
    },
    methodsAlternative: {
      type: String,
      required: [
        function () {
          return !this.methodsProvided;
        },
        '(Methods alternative error) If not providing recipe methods please provide an alternative link to where the methods can be found',
      ],
      validate: {
        validator: val =>
          validator.isURL(val, {
            protocols: ['http', 'https', 'ftp'],
            require_tld: true,
            require_protocol: true,
          }),
        message: '(Methods alternative error) Please input a valid URL',
      },
    },
    methods: {
      type: [
        {
          id: {
            type: Number,
            required: [true, '(Methods error) A method must have number'],
          },
          method: {
            type: String,
            required: [true, '(Methods error) A method must have description'],
          },
        },
      ],
      required: [
        function () {
          return this.methodsProvided;
        },
        '(Methods error) If not providing any methods, please set methodsProvided to false and provide an alternative link',
      ],
    },
    coverImage: {
      type: String,
      required: [
        true,
        '(Cover image error) A recipe must include a cover image',
      ],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    flaggedForDeletion: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

recipeSchema.index({ cookTime: -1 });

recipeSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'recipe',
  localField: '_id',
});

// generate a slug on the schema for use in the browser
recipeSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

recipeSchema.pre(/^find/, function (next) {
  this.populate({ path: 'author', select: 'username' });
  next();
});

// populate all queries that begin with 'find'
recipeSchema.pre(/^find/, function (next) {
  this.populate({ path: 'reviews', select: 'rating comment author' });
  next();
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
