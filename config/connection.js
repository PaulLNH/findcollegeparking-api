const Sequelize = require("sequelize");
const config = require("./config.json");
require("dotenv").config();
const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error(
    "Error reading database connection string in the environment variables."
  );
}

const options = DATABASE_URL.includes("localhost")
  ? config["localhost"]
  : config["awsrds"];

if (!options) {
  throw new Error(
    "Error parsing database connection string."
  );
}

const sequelize = new Sequelize(DATABASE_URL, options);

module.exports = sequelize;
