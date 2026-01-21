require("dotenv").config()
const DBConnection = require("./db.js");
const Listing = require("../models/listing.js");
const dataObj = require("./data.js");
DBConnection();

async function initDB() {
  dataObj.data=dataObj.data.map((obj)=>({...obj,owner:'69711016f3ceb519f17a2837'}))
  await Listing.deleteMany({});
  await Listing.insertMany(dataObj.data);
  console.log("Data initialize successfully");
}

initDB();
