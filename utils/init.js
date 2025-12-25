require("dotenv").config()
const DBConnection = require("./db.js");
const Listing = require("../models/listing.js");
const dataObj = require("./data.js");
DBConnection();

async function initDB() {
  await Listing.deleteMany({});
  await Listing.insertMany(dataObj.data);
  console.log("Data initialize successfully");
}

initDB();
