const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "Name is too short"],
    required: [true, "Name is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    validate: /^https?:\/\//,
  },

  price: {
    type: Number,
    min: [0, "Invalid price"],
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    minLength: [10, "Description is too short"],
    required: [true, "Description is required"],
  },
  paymentMethod: {
    type: String,
    enum: {
      values: ["crypto-wallet", "credit-card", "debit-card", "paypal"],
      message: "Invalid payment method",
    },
    required: [true, "Payment method is required"],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  buyers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

module.exports = Crypto;
