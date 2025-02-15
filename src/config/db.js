const mysql = require("mysql2");

require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

pool.promise()
    .query("select * from projects")
    .then((result) => {
        console.log(result[0][0]);
    });

module.exports = pool.promise();
