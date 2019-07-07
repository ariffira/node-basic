// connecting mysql database
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'arif',
    password: '@r1fDCI2019',
    database: 'testDB'
});

module.exports = connection;