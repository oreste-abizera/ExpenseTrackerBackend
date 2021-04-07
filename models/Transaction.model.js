const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Add amount for this transaction"],
  },
  type: {
    type: String,
    required: [true, "Transaction type is required"],
    enum: ["income", "expense"],
  },
  mode: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  note: {
    type: String,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Category of the transaction is required."],
    ref: "Category",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Transaction Creator is required"],
    ref: "User",
  },
});

TransactionSchema.index({ date: 1, note: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Transaction", TransactionSchema);
