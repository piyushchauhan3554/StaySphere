const express = require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js");
const { validateListings } = require("../middlewares/validation.js")
const {isLoggedIn}=require("../middlewares/isLoggedIn.js")
// index route

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("../views/Listings/index.ejs", { allListings });
  })
);
// create route

router.get("/new",isLoggedIn, (req, res) => {
  res.render("../views/Listings/new.ejs");
  
});

// show route

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id).populate("reviews").populate("owner");
    if(!list){
      req.flash("error","Listing does not exist")
      res.redirect("/listings")
    }else{
      res.render("../views/Listings/show.ejs", { list });
    }
  })
);


// new route

router.post(
  "/",isLoggedIn,
  validateListings,
  wrapAsync(async (req, res) => {
    const l1 = new Listing(req.body.listings);
    l1.owner=req.user._id;
    await l1.save();
    req.flash("success","new Listing Added!!")
    res.redirect("/listings");
  })
);

// edit route

router.get(
  "/:id/edit",isLoggedIn,
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const list = await Listing.findById(id);
    if(!list){
      req.flash("error","Listing does not exist")
      res.redirect("/listings")
    }else{
    res.render("../views/Listings/edit.ejs", { list });
    }
  })
);

// update route
router.put(
  "/:id",isLoggedIn,
  validateListings,
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listings },
      { new: true, runValidators: true }
    );
    req.flash("success","Listing Updated Successfully")
    res.redirect(`/listings/${id}`);
  })
);

// delete route

router.delete(
  "/:id",isLoggedIn,
  wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success","Listing deleted successfully")
    res.redirect("/listings");
  })
);


module.exports=router;