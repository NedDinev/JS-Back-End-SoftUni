const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 4,
    required: [true, "Username is required"],
  },
  address: {
    type: String,
    maxLength: 20,
    required: [true, "Address is required"],
  },
  password: {
    type: String,
    minLength: 3,
    required: [true, "Password is required"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
