const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'security',
  user: 'root',
  password: 'example'
})

module.exports = pool;