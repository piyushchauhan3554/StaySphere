const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
// validation  function to validate listings

validateListings = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    console.log(errMsg);

    throw new ExpressError(400, errMsg);
  } else next();
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

module.exports={validateListings,validateReviews}