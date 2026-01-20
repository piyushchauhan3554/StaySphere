const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middlewares/isLoggedIn.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReviews } = require("../middlewares/validation.js");
const { isReviewAuthor } = require("../middlewares/isReviewAuthor.js");
const reviewController = require("../controllers/reviews.js");

router
  .route("/")
  .post(isLoggedIn, validateReviews, wrapAsync(reviewController.reviewPost))
  .get(wrapAsync(reviewController.reviewGetReq));

router
  .route("/:reviewId")
  .delete(isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview))
  .get(wrapAsync(reviewController.getReviewIdReq));

module.exports = router;
