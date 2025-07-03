const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const reviewSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  body: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const review = mongoose.model("review", reviewSchema);
module.exports = review;
