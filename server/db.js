const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

module.exports= mysql.createConnection({
    user: process.env.user,
    host: process.env.host,
    password: process.env.password,
    database: process.env.database,
  });