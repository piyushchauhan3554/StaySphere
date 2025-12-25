// database connection

const mongoose = require("mongoose");
const Mongo_URL = process.env.Mongo_URL;
async function DBConnection() {
  await mongoose.connect(Mongo_URL);
}

DBConnection()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Not Connected : " + err);
  });

module.exports = DBConnection;
