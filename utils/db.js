// database connection

const mongoose = require("mongoose");
const MONGO_ATLAS_URL= process.env.MONGO_ATLAS_URL;
async function DBConnection() {
  await mongoose.connect(MONGO_ATLAS_URL);
}

DBConnection()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Not Connected : " + err);
  });

module.exports = DBConnection;
