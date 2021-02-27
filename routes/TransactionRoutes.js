const express = require("express");
const {
  addTransaction,
  getTransactions,
  getIncomes,
  getExpenses,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/TransactionController");

const Router = express.Router();

Router.route("/").post(addTransaction).get(getTransactions);
Router.route("/income").get(getIncomes);
Router.route("/expenses").get(getExpenses);
Router.route("/:id")
  .get(getSingleTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = Router;
