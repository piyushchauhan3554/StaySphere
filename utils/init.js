require("dotenv").config()
const DBConnection = require("./db.js");
const Listing = require("../models/listing.js");
const dataObj = require("./data.js");
DBConnection();

async function initDB() {
  dataObj.data=dataObj.data.map((obj)=>({...obj,owner:'697715cbced0565b0279d7e0'}))
  await Listing.deleteMany({});
  await Listing.insertMany(dataObj.data);
  console.log("Data initialize successfully");
}

initDB();
