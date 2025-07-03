const Listing = require("../models/listing"); // adjust path as needed

// Get listings by category
module.exports.getListingsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    // console.log(category);
    
    const allListings = await Listing.find({ category });
    // console.log(allListings);
    res.render("./listings/filter.ejs", { allListings });
  } catch (err) {
    next(err);
  }
};
