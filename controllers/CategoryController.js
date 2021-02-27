const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/Category.model");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports.addCategory = asyncHandler(async (req, res, next) => {
  const { title } = req.body;

  let category = await CategoryModel.create({ title });
  if (!category) {
    return next(
      new ErrorResponse("Error occured while creating category", 500)
    );
  }
  res.json({
    success: true,
    data: category,
  });
});

module.exports.getCategories = asyncHandler(async (req, res, next) => {
  let categories = await CategoryModel.find();
  if (!categories) {
    return next(new ErrorResponse("Getting categories failed."));
  }
  res.json({
    success: true,
    data: categories,
  });
});

module.exports.getSingleCategory = asyncHandler(async (req, res, next) => {
  let category = await CategoryModel.findById(req.params.id);
  if (!category) {
    return next(new ErrorResponse("Getting category failed."));
  }
  res.json({
    success: true,
    data: category,
  });
});

module.exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return next(new ErrorResponse("No data to update provided"));
  }
  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    { title },
    { new: true, runValidators: true }
  );
  if (!updatedCategory) {
    return next(new ErrorResponse("Updating category failed"));
  }
  res.json({
    success: true,
    data: updatedCategory,
  });
});

module.exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);
  if (!deletedCategory) {
    return next(new ErrorResponse("Deleting category failed", 500));
  }
  res.json({
    success: true,
    data: deletedCategory,
  });
});
