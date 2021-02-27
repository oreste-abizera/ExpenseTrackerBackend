const asyncHandler = require("express-async-handler");
const UserModel = require("../models/User.model");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports.registerUser = asyncHandler(async (req, res, next) => {
  let userData = ({ names, email, password, phone } = req.body);

  //check one option between phone and email
  if (!userData.phone && !userData.email) {
    return next(new ErrorResponse("Please provide email or phone", 400));
  }
  // check uniqueness of email and phone
  if (userData.email && (await UserModel.findOne({ email: userData.email }))) {
    return next(new ErrorResponse("User with this email already exists"));
  }

  if (userData.phone && (await UserModel.findOne({ phone: userData.phone }))) {
    return next(new ErrorResponse("User with this phone already exists"));
  }

  const newUser = await UserModel.create(userData);
  if (newUser) {
    await sendTokenResponse(newUser, 200, res);
  } else {
    return next(new ErrorResponse("Registration failed.", 500));
  }
});

module.exports.loginUser = asyncHandler(async (req, res, next) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return next(new ErrorResponse("Enter identifier and password", 400));
  }
  let user;
  user = await UserModel.findOne({ email: identifier }).select("+password");
  if (!user) {
    user = await UserModel.findOne({ phone: identifier }).select("+password");
  }

  if (user) {
    if (!(await user.comparePasswords(password))) {
      user = null;
    }
  }

  if (!user) {
    return next(new ErrorResponse("Invalid credentials.", 401));
  }
  await sendTokenResponse(user, 200, res);
});

module.exports.updateUser = asyncHandler(async (req, res, next) => {
  //Update user profile
  const userData = ({ names, email, phone } = req.body);
  if (!userData.names && !userData.email && !userData.phone) {
    return next(new ErrorResponse("no new info provided", 400));
  }

  let updateduser = await UserModel.findByIdAndUpdate(req.user._id, userData, {
    new: true,
    runValidators: true,
  });
  if (!updateduser) {
    return next(new ErrorResponse("Error occured", 500));
  }
  res.json({
    success: true,
    user: updateduser,
  });
});

//send token response
const sendTokenResponse = asyncHandler(async (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
});
