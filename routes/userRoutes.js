const express = require('express');
const {
  getMe,
  updateMe,
  deleteMe,
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../controllers/userController');
const {
  whoAmI,
  signUp,
  logIn,
  logout,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

const router = express.Router();

router.route('/whoami').get(whoAmI);

router.route('/signup').post(signUp);

router.route('/login').post(logIn);
router.route('/logout').get(logout);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:jwt', resetPassword);

router.use(protect);

router
  .route('/me')
  .get(getMe)
  .patch(uploadUserPhoto, resizeUserPhoto, updateMe)
  .delete(deleteMe);

// Restricted to ADMIN
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
