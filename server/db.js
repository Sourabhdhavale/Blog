const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'blogmysqldb-sourabhsrh007-13fe.g.aivencloud.com',
  user: 'avnadmin',
  port:15503,
  password: 'AVNS_-Vp8-4Gx90jNKvLJrEU',
  database: 'defaultdb',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});


module.exports = {
  pool,
}

