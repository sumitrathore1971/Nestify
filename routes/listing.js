const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");
const filterController = require("../controllers/filter.js");
const queryController = require("../controllers/query.js");
//index and post route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createNewListing)
  );

//New route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router.get(
  "/category/:category",
  wrapAsync(filterController.getListingsByCategory)
);
router.get("/search", wrapAsync(queryController.searchListings));


router.get("/privacy", (req, res) => {
  res.render("./privacyTerms/privacy.ejs");
});

router.get("/terms", (req, res) => {
  res.render("./privacyTerms/terms.ejs");
});

//show, update and delete route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

module.exports = router;
