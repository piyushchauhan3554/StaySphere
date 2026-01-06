const express=require("express")
const router=express.Router({mergeParams:true});

const wrapAsync=require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReviews}=require("../middlewares/validation.js")
// review post route

router.post(
  "/",
  validateReviews,
  wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const review = new Review(req.body.review);

    const listing = await Listing.findById(id);
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    res.redirect(`/listings/${id}`);
  })
);

// review delete route

router.delete("/:reviewId",wrapAsync(async (req,res)=>{
  const {id,reviewId}=req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
  await Review.findByIdAndDelete(reviewId)
  res.redirect(`/listings/${id}`);
}))

module.exports=router;