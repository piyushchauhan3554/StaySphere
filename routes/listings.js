const express = require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js");
const { validateListings } = require("../middlewares/validation.js")

// index route

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("../views/Listings/index.ejs", { allListings });
  })
);
// create route

router.get("/new", (req, res) => {
  res.render("../views/Listings/new.ejs");
});

// show route

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id).populate("reviews");
    res.render("../views/Listings/show.ejs", { list });
  })
);




// new route

router.post(
  "/",
  validateListings,
  wrapAsync(async (req, res) => {
    const l1 = new Listing(req.body.listings);
    await l1.save();
    res.redirect("/listings");
  })
);

// edit route

router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const list = await Listing.findById(id);
    res.render("../views/Listings/edit.ejs", { list });
  })
);

// update route
router.put(
  "/:id",
  validateListings,
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listings },
      { new: true, runValidators: true }
    );
    res.redirect(`/listings/${id}`);
  })
);

// delete route

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/listings");
  })
);


module.exports=router;