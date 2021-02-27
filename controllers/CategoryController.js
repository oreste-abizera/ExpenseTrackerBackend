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
