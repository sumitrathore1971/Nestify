const mongoose = require("mongoose");
const Review = require("./reviews");
const User = require("./user");
const { number, required } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: Review.modelName,
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "trending",
      "rooms",
      "iconic-cities",
      "mountains",
      "castles",
      "farms",
      "amazing-views",
      "beach",
      "cabins",
      "amazing-pools",
      "camping",
      "arctic",
    ],
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    let res = await Review.deleteMany({ _id: { $in: listing.reviews } });
    console.log(res);
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
