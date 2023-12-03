const express = require("express");
const config = require("config");
const app = express();
const sockServer = require("http").createServer(app);

const winston = require("winston");
require("./startup/logging")();
require("./startup/logger");
require("./startup/cors")(app);

require("./startup/routes")(app);
require("./startup/db")();
// );
const port = process.env.PORT || config.get("port");
// const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

const server = sockServer.listen(port, () => winston.info(`Listening on port ${port}...`));

// cron.schedule("0 0 4 * * *", async function () {
//     checkSubscription();
// });
module.exports = server;
