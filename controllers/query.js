const Listing = require("../models/listing");

module.exports.searchListings = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.redirect("/listings");
  }
  const results = await Listing.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
      { country: { $regex: query, $options: "i" } },
    ],
  });
  // console.log(results);
  res.render("./listings/searchResults.ejs", { results, query });
};
