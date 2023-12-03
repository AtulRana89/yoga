const express = require("express");
const reqLogger = require("../startup/logger");

const user = require("../routes/users");


module.exports = function (app) {
  app.use(express.json());
  app.use(reqLogger);
  app.use("/api/user", user);
};
