const Listing=require("../models/listing")

module.exports.renderListings=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("../views/Listings/index.ejs", { allListings });
  }

module.exports.showListings=async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id).populate({path:"reviews",populate:{
      path:"author"
    }}).populate("owner");
    if(!list){
      req.flash("error","Listing does not exist")
      res.redirect("/listings")
    }else{
      res.render("../views/Listings/show.ejs", { list });
    }
  }

module.exports.newListingPost=async (req, res) => {
    const l1 = new Listing(req.body.listings);
    l1.owner=req.user._id;
    await l1.save();
    req.flash("success","new Listing Added!!")
    res.redirect("/listings");
  }

module.exports.editListing=async (req, res) => {
    const id = req.params.id;
    const list = await Listing.findById(id);
    if (!list) {
      req.flash("error", "Listing does not exist");
      res.redirect("/listings");
    } else {
      res.render("../views/Listings/edit.ejs", { list });
    }
  }

module.exports.updateListing=async (req, res) => {
    const id = req.params.id;
    await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listings },
      { new: true, runValidators: true },
    );
    req.flash("success", "Listing Updated Successfully");
    res.redirect(`/listings/${id}`);
  }

module.exports.destroyListing=async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing deleted successfully");
    res.redirect("/listings");
  }