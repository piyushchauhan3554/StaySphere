require("dotenv").config();
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const DBConnection = require("./utils/db.js");
const Listing = require("./models/listing.js");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
const PORT = process.env.PORT || 5000;

DBConnection();

// root route

app.get("/", (req, res) => {
  res.send("I am root route");
});

// index route

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("../views/Listings/index.ejs", { allListings });
});
// create route

app.get("/listings/new", (req, res) => {
  res.render("../views/Listings/new.ejs");
});

// show route

app.get("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const list = await Listing.findById(id);
    res.render("../views/Listings/show.ejs", { list });
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

// new route

app.post("/listings", async (req, res) => {
  try {
    const l1 = new Listing(req.body.listings);
    await l1.save();
    res.redirect("/listings");
  } catch (error) {
    res.send("DB Error");
    console.log(error);
  }
});

// edit route

app.get("/listings/:id/edit", async (req, res) => {
  try {
    const id = req.params.id;
    const list = await Listing.findById(id);
    res.render("../views/Listings/edit.ejs", { list });
  } catch (error) {
    console.log(error);
    res.send("DB Error");
  }
});

// update route
app.put("/listings/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listings },
      { new: true, runValidators: true }
    );
    res.redirect(`/listings/${id}`);
  } catch (error) {
    console.log(error);
    res.send("DB Error");
  }
});

// delete route

app.delete("/listings/:id", async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/listings");
  } catch (error) {
    console.log(error);
    res.send("DB Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening at PORT:${PORT}`);
});
