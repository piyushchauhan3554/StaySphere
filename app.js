require("dotenv").config();
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const DBConnection = require("./utils/db.js");
const ExpressError = require("./utils/ExpressError.js");
const listingsRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
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

// routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter);

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
