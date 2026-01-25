const mongoose = require("mongoose");
const Review = require("./review.js");
const listingSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true },
  image: {
    url: {
      type: String,
      default: process.env.default_img_url,
      set: (v) => (v === "" ? process.env.default_img_url : v),
    },
    filename: {
      type: String,
    },
  },
  category:{
    type:String,
    // enum:['Trending','Rooms','Beaches','Mountains','Pools','Camping','Cities','Castle','Others']
  },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  coordinates:{
    type:[Number],
    required:true
  },
  country: { type: String, required: true },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing.reviews.length) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
