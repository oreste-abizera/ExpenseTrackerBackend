const asyncHandler = require("express-async-handler");
const TransactionModel = require("../models/Transaction.model");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports.addTransaction = asyncHandler(async (req, res, next) => {
  let transaction = await TransactionModel.create(req.body);
  if (!transaction) {
    return next(new ErrorResponse("Adding transaction failed..."));
  }
  res.json({
    success: true,
    data: transaction,
  });
});

module.exports.getIncomes = asyncHandler(async (req, res, next) => {
  let transactions = await TransactionModel.find({ type: "income" });
  if (!transactions) {
    return next(new ErrorResponse("Getting incomes failed."));
  }
  res.json({
    success: true,
    data: transactions,
  });
});

module.exports.getExpenses = asyncHandler(async (req, res, next) => {
  let transactions = await TransactionModel.find({ type: "expense" });
  if (!transactions) {
    return next(new ErrorResponse("Getting incomes failed."));
  }
  res.json({
    success: true,
    data: transactions,
  });
});

module.exports.getTransactions = asyncHandler(async (req, res, next) => {
  let transactions = await TransactionModel.find();
  if (!transactions) {
    return next(new ErrorResponse("Getting transactions failed."));
  }
  res.json({
    success: true,
    data: transactions,
  });
});

module.exports.getSingleTransaction = asyncHandler(async (req, res, next) => {
  let transaction = await TransactionModel.findById(req.params.id);
  if (!transaction) {
    return next(new ErrorResponse("Getting transaction failed."));
  }
  res.json({
    success: true,
    data: transaction,
  });
});

module.exports.updateTransaction = asyncHandler(async (req, res, next) => {
  let updatedTransaction = await TransactionModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedTransaction) {
    return next(new ErrorResponse("updating transaction failed."));
  }
  res.json({
    success: true,
    data: updatedTransaction,
  });
});

module.exports.deleteTransaction = asyncHandler(async (req, res, next) => {
  let deletedTransaction = await TransactionModel.findByIdAndDelete(
    req.params.id
  );
  if (!deletedTransaction) {
    return next(new ErrorResponse("deleting transaction failed."));
  }
  res.json({
    success: true,
    data: deletedTransaction,
  });
});
