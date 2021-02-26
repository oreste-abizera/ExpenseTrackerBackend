const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/UserController");
const Router = express.Router();

Router.post("/register", registerUser);
Router.post("/login", loginUser);
Router.put("/update", updateUser);

module.exports = Router;
