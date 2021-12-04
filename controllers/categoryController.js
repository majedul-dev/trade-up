const Category = require("../models/Category");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// @route   POST api/category
// @desc    Create category
// @access  Private
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const category = new Category(req.body);

  const createdCategory = await category.save();

  res.status(200).json({
    success: true,
    createdCategory,
  });
});

// @route   GET api/category
// @desc    Get all categories
// @access  Public
exports.getCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    categories,
  });
});

// @route   PUT api/category/:categoryId
// @desc    Update category by ID
// @access  Private
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    return next(ErrorHandler("Category are not found", 404));
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.categoryId,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    updatedCategory,
  });
});

// @route   DELETE api/category/:categoryId
// @desc    DELETE category by ID
// @access  Private
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    return next(ErrorHandler("Category are not found", 404));
  }

  await category.remove();

  res
    .status(200)
    .json({ success: true, message: "Category deleted successfully" });
});
