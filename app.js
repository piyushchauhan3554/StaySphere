require("dotenv").config();
const express = require("express");
const DBConnection = require("./utils/db.js");
const Listing = require("./models/listing.js");
const app = express();
const PORT = process.env.PORT || 5000;

DBConnection();

// root route

app.get("/", (req, res) => {
  res.send("I am root route");
});

// listing testing route

app.get("/testing", async (req, res) => {
  try {
    const listing1 = new Listing({
      title: "sweet home",
      description: "near the beach",
      country: "india",
      location: "goa",
      price: 1200,
    });
    await listing1.save();
    console.log("data inserted successfully");
    res.send("testing successfully");
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening at PORT:${PORT}`);
});
