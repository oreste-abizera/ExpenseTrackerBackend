const express = require("express");
const {
  addCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");
const { protect } = require("../middlewares/Auth");
const Router = express.Router();

Router.route("/").post(protect, addCategory).get(getCategories);
Router.route("/:id")
  .get(getSingleCategory)
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

module.exports = Router;
