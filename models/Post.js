const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  /* caption: {
    type: String,
    required: true,
  }, */
  bottleInspection: {
    type: String,
    required: false,
  },
  pourability: {
    type: String,
    required: false,
  },
  smell: {
    type: String,
    required: false,
  },
  taste: {
    type: String,
    required: false,
  },
  heat: {
    type: String,
    required: true,
  },
  thoughts: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  purchase: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
