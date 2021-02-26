const asyncHandler = require("express-async-handler");

module.exports.registerUser = asyncHandler(async (req, res) => {
  //register user
  console.log("Register user");
  console.log(req.body);
  console.log(object);
});

module.exports.loginUser = asyncHandler(async (req, res) => {
  //login user
  console.log("Login user");
});

module.exports.updateUser = asyncHandler(async (req, res) => {
  //Update user profile
  console.log("Update user info");
});
