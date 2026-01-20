const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.reviewPost = async (req, res, next) => {
  const id = req.params.id;
  const review = new Review(req.body.review);

  const listing = await Listing.findById(id);
  listing.reviews.push(review);
  review.author = req.user._id;
  await review.save();
  await listing.save();
  req.flash("success", "new Review Added!!");
  res.redirect(`/listings/${id}`);
};

module.exports.reviewGetReq = async (req, res, next) => {
  const id = req.params.id;
  res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted Successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.getReviewIdReq = async (req, res, next) => {
  const id = req.params.id;
  res.redirect(`/listings/${id}`);
};
