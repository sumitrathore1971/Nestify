const Review = require("../models/reviews");
const Listing = require("../models/listing");
const User = require("../models/user");

module.exports.reviewPost = async (req, res) => {
  console.log("Body of request");
  console.log(req.body);
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  // console.log(newReview);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  // console.log(req.body);
  // console.log("new review saved");
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing.id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
