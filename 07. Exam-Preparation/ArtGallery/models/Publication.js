const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [6, "Title is too short"],
    required: [true, "Title is required"],
  },
  paintingTech: {
    type: String,
    maxLength: [15, "Painting technology is too long"],
    required: [true, "Painting technology is required"],
  },

  picture: {
    type: String,
    required: [true, "Art picture is required"],
    validate: /^https?:\/\//,
  },
  certificate: {
    type: String,
    enum: {
      values: ["Yes", "yes", "No", "no"],
      message: "Invalid input",
    },
    required: [true, "Description is required"],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  usersShared: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Publication = mongoose.model("Publication", publicationSchema);

module.exports = Publication;
