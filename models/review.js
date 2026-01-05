const mongoose = require("mongoose");

const reviewSchema=new mongoose.Schema({
  comment:{
    type:String
  },
  rating:{
    type:Number,
    max:5,
    min:1
  },
  created_At:{
    type:Date,
    default:new Date()
  }
})

const Review=mongoose.model("Review",reviewSchema)

module.exports=Review;