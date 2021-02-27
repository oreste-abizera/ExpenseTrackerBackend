const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
});

module.exports = mongoose.model("Category", CategorySchema);
