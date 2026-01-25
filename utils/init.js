require("dotenv").config()
const DBConnection = require("./db.js");
const Listing = require("../models/listing.js");
const dataObj = require("./data.js");
DBConnection();

async function initDB() {
  dataObj.data=dataObj.data.map((obj)=>({...obj,owner:'6976470cc52effe580778437'}))
  await Listing.deleteMany({});
  await Listing.insertMany(dataObj.data);
  console.log("Data initialize successfully");
}

initDB();
