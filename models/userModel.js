const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { encrypt, decipher } = require('../utils/cipher');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, '(Email error) Please enter a valid email address'],
      set: encrypt,
      get: decipher,
    },
    joinDate: Date,
    photo: {
      type: String,
      default: 'default.jpeg',
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    username: {
      type: String,
      unique: true,
      required: [true, '(Username error) Please enter a username'],
      validate: {
        validator: val => {
          const regex = /^(?=[a-zA-Z0-9._ ]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
          return regex.test(val);
        },
        message:
          "(Username error) Username may only contain upper/lowercase letters, numbers, or these special characters: '.' and '_', and can only be between 3 and 15 characters.",
      },
    },
    password: {
      type: String,
      required: [true, '(Password error) Please enter a password'],
      minLength: 8,
      select: false,
    },
    passwordConfirmation: {
      type: String,
      required: [
        true,
        '(Password confirmation error) Please confirm your password',
      ],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: '(Password match error) Passwords do not match!',
      },
      // don't need select here as we set it to undefined when we encrypt the password
      // select: false,
    },
    passwordChangedAt: { type: Date, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetExpiryDate: { type: Date, select: false },
    flaggedForDeletion: {
      type: Boolean,
      default: false,
      select: false,
    },
    daysUntilDeletion: { type: Number, select: false },
    bookmarks: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Recipe',
        },
      ],
    },
  },
  {
    toJSON: {
      virtuals: true,
      setters: true,
      getters: true,
    },
    toObject: {
      virtuals: true,
      setters: true,
      getters: true,
    },
    runSettersOnQuery: true,
  }
);

userSchema.virtual('recipes', {
  ref: 'Recipe',
  foreignField: 'author',
  localField: '_id',
});

// hash passwords
userSchema.pre('save', async function (next) {
  // Only run pre if password was modified (ie new account created or password changed)
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 14);
  this.passwordConfirmation = undefined;
  next();
});

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimeStamp < changedTimeStamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpiryDate = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.savePasswordChangedAtDate = function (timestamp) {
  const JWTDate = new Date(timestamp * 1000);

  this.passwordChangedAt = JWTDate;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
