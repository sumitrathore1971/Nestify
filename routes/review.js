const express = require("express");
const router = express.Router({ mergeParams: true });
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAutor,
} = require("../middleware.js");

const reviewController = require("../controllers/review.js");



//review route
router.post(
  "/:id/reviews",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.reviewPost)
);

//Delete review route
router.delete(
  "/:id/reviews/:reviewId",
  isLoggedIn,
  isReviewAutor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
