const Review = require("../models/review");
const isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if(!(review.author._id.equals(req.user._id))){
    req.flash("error","you are not owner of this review")
    return res.redirect(`/listings/${id}`)
  }
  next()
};

module.exports={isReviewAuthor}
