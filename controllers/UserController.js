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

module.exports.loginUser = asyncHandler(async (req, res) => {
  //login user
  console.log("Login user");
});

module.exports.updateUser = asyncHandler(async (req, res) => {
  //Update user profile
  console.log("Update user info");
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
