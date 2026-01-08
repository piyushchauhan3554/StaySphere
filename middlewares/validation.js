const {
  listingSchema,
  reviewSchema,
  signupSchema,
  loginSchema,
} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
// validation  function to validate listings

validateListings = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    req.flash("error", error.message);
    return res.redirect("/listings/new");

    // throw new ExpressError(400, errMsg);
  }
  next();
};

// validation function to validate review

validateReviews = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    console.log(errMsg);
    throw new ExpressError(400, errMsg);
  } else next();
};

// validation function to validate signup

const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    req.flash("error", error.message);
    return res.redirect("/signup");
    // return next(new ExpressError(400, error.message));
  }
  next();
};
const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    req.flash("error", error.message);
    return res.redirect("/login");
    // throw new ExpressError(400, error.message);
  }
  next();
};
module.exports = {
  validateListings,
  validateReviews,
  validateSignup,
  validateLogin,
};
