const mysql = require('mysql2');
require('dotenv').config();

class Database {
    constructor (config) {
        this.connection = mysql.createConnection(config);
    };

    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, rows) => {
                if(err) {
                    return reject(err);
                };
                resolve(rows)
            });
        });
    };
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    };
};


// create connection to database
const db = new Database ({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

module.exports = db;
