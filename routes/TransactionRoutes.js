const express = require("express");
const {
  addTransaction,
  getTransactions,
  getIncomes,
  getExpenses,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
  syncTransactions,
} = require("../controllers/TransactionController");
const { protect } = require("../middlewares/Auth");

const Router = express.Router();

Router.route("/").post(protect, addTransaction).get(protect, getTransactions);
Router.route("/income").get(protect, getIncomes);
Router.route("/expenses").get(protect, getExpenses);
Router.route("/:id")
  .get(protect, getSingleTransaction)
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);
Router.route("/sync").post(protect, syncTransactions);

module.exports = Router;
