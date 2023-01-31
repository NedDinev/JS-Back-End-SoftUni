const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: {
    type: String,
    required: true,
    match: [/^https?:\/\//, "Invalid URL"],
  }, // http/https validation with Regex
  description: { type: String, required: true, maxLength: 50 },
});

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;
