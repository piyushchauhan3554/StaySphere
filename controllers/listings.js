const Listing = require("../models/listing");

module.exports.renderListings = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("../views/Listings/index.ejs", { allListings });
};

module.exports.showListings = async (req, res) => {
  const { id } = req.params;
  const list = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!list) {
    req.flash("error", "Listing does not exist");
    res.redirect("/listings");
  } else {
    res.render("../views/Listings/show.ejs", { list });
  }
};

module.exports.newListingPost = async (req, res) => {
  const l1 = new Listing(req.body.listings);

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${l1.location}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.length === 0) {
    console.log("location not found");
    req.flash("error", "No Such Location Found");
    return res.redirect("/listings/new");
  }

  const lat = data[0].lat;
  const lon = data[0].lon;
  l1.coordinates.push(lat);
  l1.coordinates.push(lon);
  const { path, filename } = req.file;
  l1.image.url = path;
  l1.image.filename = filename;
  l1.owner = req.user._id;
  await l1.save();
  req.flash("success", "new Listing Added!!");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
  const id = req.params.id;
  const list = await Listing.findById(id);
  if (!list) {
    req.flash("error", "Listing does not exist");
    res.redirect("/listings");
  } else {
    let originalURL = list.image.url;
    originalURL = originalURL.replace(
      "/upload",
      "/upload/c_thumb,g_face,h_200,w_200/r_max/f_auto",
    );
    res.render("../views/Listings/edit.ejs", { list, originalURL });
  }
};

module.exports.updateListing = async (req, res) => {
  const id = req.params.id;
  await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listings },
    { new: true, runValidators: true },
  );
  if (typeof req.file !== "undefined") {
    const { path, filename } = req.file;
    const l1 = await Listing.findById(id);
    console.log(l1);
    l1.image.url = path;
    l1.image.filename = filename;
    l1.save();
  }
  req.flash("success", "Listing Updated Successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing deleted successfully");
  res.redirect("/listings");
};
