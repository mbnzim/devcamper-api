const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

//@desc           Get all Users
//@route          GET /api/v1/auth/users
//@access         Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc           Get single user
//@route          GET /api/v1/auth/users/:id
//@access         Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc           Create user
//@route          POST /api/v1/auth/users
//@access         Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

//@desc           Update user
//@route          PUT /api/v1/auth/users/:id
//@access         Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User ${req.params.id} does not exist`, 404));
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidation: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc           Delete user
//@route          Delete /api/v1/auth/users/:id
//@access         Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User ${req.params.id} does not exist`, 404));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    data: 'User deleted successful',
  });
});
