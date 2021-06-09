const User = require('../models/userModel');
const Order = require('../models/orderModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//----------- Route Handlers for Users ---------------//

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

//------ Get specific user from database ------//
// req.params means the parameter in url which we can define like '/:id' in routes and we can get the id. (req.params.id)
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id });

  // Creating Error if there is null data
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

//---- Create new user ----//
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

//---- Update user ----//
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

//------- Deleting data in database ---------//
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 401));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
