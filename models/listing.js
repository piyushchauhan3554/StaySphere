const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 50 },
  description: { type: String },
  image: {
    type: String,
    default:process.env.default_img_url,
    // if user's shared image is ""
    set: (v) => (v === "" ? process.env.default_img_url : v),
  },
  price: { type: Number, default: 1000 },
  location: { type: String, required: true },
  country: { type: String, requires: true },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
