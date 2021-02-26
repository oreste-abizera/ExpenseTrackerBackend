const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  names: {
    type: String,
    required: [true, "Names are required"],
    minlength: [3, "names must be at least 3 characters"],
    maxlength: [255, "names must not be more than 255 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please add an email"],
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please add a valid email",
    ],
    unique: [true, "email already taken"],
  },
  phoneNumber: {
    type: String,
    minlength: [10, "Phone number has to be 10 characters"],
    maxlength: [10, "Phone number has to be 10 characters"],
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters long"],
    maxlength: [255, "password must not be more than 255 characters"],
    required: [true, "Please add a password"],
    select: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
