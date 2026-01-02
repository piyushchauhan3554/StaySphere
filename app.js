require("dotenv").config();
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const DBConnection = require("./utils/db.js");
const Listing = require("./models/listing.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
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
    const list = await Listing.findById(id);
    res.render("../views/Listings/show.ejs", { list });
  })
);

// new route

app.post(
  "/listings",
  wrapAsync(async (req, res) => {
    if(!req.body){
      throw new ExpressError(400,"Listing data is empty")
    }
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
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    if(!req.body){
      throw new ExpressError(400,"Listing data is empty")
    }
    
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

// if none of the route match
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// custom error handler
app.use((err, req, res, next) => {
  const { statusCode=500, message="Something went wrong" } = err;
  res.status(statusCode).send(message);
});

app.listen(PORT, () => {
  console.log(`Server is listening at PORT:${PORT}`);
});
