const AppError = require('./appError');

exports.multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Only images are allowed to be uploaded!', 400), false);
  }
};
