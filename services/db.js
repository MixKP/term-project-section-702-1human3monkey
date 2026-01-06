const mysql = require("mysql2");
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = require("./dotenv");

// if this gonna cause a bug?
// require("dotenv").config();

const config = {
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

const db = mysql.createPool(config).promise();

module.exports = {
  db,
  config
};