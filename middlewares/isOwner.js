const Listing = require("../models/listing");
const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (req.user && !listing.owner._id.equals(req.user._id)) {
    req.flash("error", "you are not the owner of the listing");
    res.redirect(`/listings/${id}`);
  } else next();
};

module.exports={isOwner}