const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("dbMlab");
  mongoose.set("useCreateIndex", true);
  mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log(`Connected to ${db}...`));
};
