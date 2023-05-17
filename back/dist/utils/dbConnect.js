"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql2');
// let ENV = process.env.ENVIRONNEMENT || ""
class DbConnect {
    connection;
    constructor() {
        let connectString = process.env.DATABASE_URL || 'mysql://root:root@localhost/planetscale';
        this.connection = mysql.createConnection(connectString);
    }
    close() {
        setTimeout(() => {
            this.connection.end();
        }, 1);
    }
}
exports.default = DbConnect;
