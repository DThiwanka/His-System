const mysql = require("mysql");
const dbConfig = require("../config/db.config");

const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  connectionLimit: 10, 
});


connection.getConnection((err, conn) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
    conn.release();
  }
});

module.exports = connection;
