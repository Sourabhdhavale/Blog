const mysql = require('mysql2');
require("dotenv").config();
// // Create the connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = {
  pool,
};


// const mysql = require('mysql2');
// // require("dotenv").config();
// // // Create the connection pool using environment variables
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'D4-sourabh-83871',
//   port: '3306',
//   password: 'manager',
//   database: 'airbnb_db',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// module.exports = {
//   pool,
// };
// // 



