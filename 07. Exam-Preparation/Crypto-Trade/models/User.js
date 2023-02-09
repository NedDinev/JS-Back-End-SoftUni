const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    virutals: {
      repeatPassword: {
        set(value) {
          if (this.password !== value) {
            throw new mongoose.Error("Passwords do not match");
          }
        },
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
