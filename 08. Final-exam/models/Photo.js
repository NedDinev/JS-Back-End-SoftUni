const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "Name is too short"],
    required: [true, "Title is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    validate: {
      validator: /^https?:\/\//,
      message: "Invalid picture",
    },
  },
  age: {
    type: Number,
    validate: {
      validator: /([1-9]|[1-8][0-9]|9[0-9]|100)/,
      message: "Invalid age",
    },
    required: [true, "Age is required"],
  },
  description: {
    type: String,
    minLength: [5, "Description is too short"],
    maxLength: [50, "Description is too long"],
    required: [true, "Description is required"],
  },
  location: {
    type: String,
    minLength: [5, "Location is too short"],
    maxLength: [50, "Location is too long"],
    required: [true, "Location is required"],
  },
  commentList: [
    {
      userId: { type: String },
      comment: {
        type: String,
      },
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
