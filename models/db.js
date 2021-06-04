const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

//create database connection
const conn = mysql.createConnection({
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  });

  //connect to database
  conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });

module.exports = conn;