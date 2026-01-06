const dotenv = require("dotenv");
const fs = require("fs");

if (!fs.existsSync(".env")) {
  console.error("ERROR: .env file not found!");
  process.exit(1);
}

const result = dotenv.config();

if (result.error) {
  console.error("ERROR: Failed to load .env file: ", result.error);
  process.exit(1);
}

const requiredEnv = [
  "MYSQL_HOST",
  "MYSQL_USER",
  "MYSQL_PASSWORD",
  "MYSQL_DATABASE",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD"
];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
  console.error(
    `ERROR: Missing required environment variables: ${missingEnv.join(", ")}`
  );
  process.exit(1);
}

module.exports = {
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
};
