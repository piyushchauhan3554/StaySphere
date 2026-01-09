const mongoose = require("mongoose");
const Review=require("./review.js")
const listingSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 50 },
  description: { type: String ,required:true},
  image: {
    type: String,
    default:process.env.default_img_url,
    // if user's shared image is ""
    set: (v) => (v === "" ? process.env.default_img_url : v),
  },
  price: { type: Number,required:true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review"
    }
  ],
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
if(listing.reviews.length){
  await Review.deleteMany({_id:{$in:listing.reviews}})
}
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
