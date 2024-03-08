const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "255225",
  });

module.exports = connection;
