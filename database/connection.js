const mysql = require('mysql2');

//should I run DB connect here?

const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'movies'
});


module.exports = connect;