require("dotenv").config();
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const DBConnection = require("./utils/db.js");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 5000;

app.engine("ejs", ejsMate);

DBConnection();

// root route

app.get("/", (req, res) => {
  res.send("I am root route");
});

// index route

app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("../views/Listings/index.ejs", { allListings });
  })
);
// create route

app.get("/listings/new", (req, res) => {
  res.render("../views/Listings/new.ejs");
});

// show route

app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id).populate("reviews");
    res.render("../views/Listings/show.ejs", { list });
  })
);

// validation  function to validate listings

const validateListings = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    console.log(errMsg);

    throw new ExpressError(400, errMsg);
  } else next();
};

// validation function to validate review

const validateReviews = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    console.log(errMsg);

    throw new ExpressError(400, errMsg);
  } else next();
};
// new route

app.post(
  "/listings",
  validateListings,
  wrapAsync(async (req, res) => {
    const l1 = new Listing(req.body.listings);
    await l1.save();
    res.redirect("/listings");
  })
);

// edit route

app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const list = await Listing.findById(id);
    res.render("../views/Listings/edit.ejs", { list });
  })
);

// update route
app.put(
  "/listings/:id",
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

app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/listings");
  })
);

// review post route

app.post(
  "/listings/:id/reviews",
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


app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async (req,res)=>{
  const {id,reviewId}=req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
  await Review.findByIdAndDelete(reviewId)
  res.redirect(`/listings/${id}`);
}))

// if none of the route match
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// custom error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("../views/Listings/error.ejs", { message });
});

app.listen(PORT, () => {
  console.log(`Server is listening at PORT:${PORT}`);
});
