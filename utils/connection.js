const mysql = require('mysql2');

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
    user: 'root',
    password: 'rA2!t0yd[W!qf@>',
    database: 'employees_db'
});

module.exports = db;
