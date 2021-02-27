const express = require("express");
const {
  addCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");
const Router = express.Router();

Router.route("/").post(addCategory).get(getCategories);
Router.route("/:id")
  .get(getSingleCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = Router;
