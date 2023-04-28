const config = require("./webpack.config.js");

// change mode to production
config.mode = "production";
// change performance.hints to false
config.performance.hints = false;

module.exports = config;
