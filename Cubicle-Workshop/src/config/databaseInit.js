const mongoose = require("mongoose");
const config = require("./index");
const uri = config.DB_URI; //development port

async function initDatabase() {
  mongoose.set("strictQuery", false);

  await mongoose.connect(uri);
  console.log("DB connected");
}

module.exports = initDatabase;
