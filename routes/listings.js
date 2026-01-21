const express = require("express");
const { storage } = require("../utils/cloudinary.js");
const multer = require("multer");
const upload = multer({ storage });
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { validateListings } = require("../middlewares/validation.js");
const { isLoggedIn } = require("../middlewares/isLoggedIn.js");
const { isOwner } = require("../middlewares/isOwner.js");
const ListingController = require("../controllers/listings.js");
router
  .route("/")
  .get(wrapAsync(ListingController.renderListings))
  .post(
    isLoggedIn,
    upload.single("listings[image]"),
    validateListings,
    wrapAsync(ListingController.newListingPost),
  );

// create route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("../views/Listings/new.ejs");
});

router
  .route("/:id")
  .get(wrapAsync(ListingController.showListings))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listings[image]"),
    validateListings,
    wrapAsync(ListingController.updateListing),
  )
  .delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing));

// edit route

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.editListing),
);

module.exports = router;
