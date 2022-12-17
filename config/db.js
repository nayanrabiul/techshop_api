const mysql = require("mysql2");
require("dotenv").config();


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0,
});

module.exports = pool;