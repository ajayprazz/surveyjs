const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'surveyjs'
};

var db = mysql.createConnection(config);

db.connect((err) => {
    if (err) throw err;
    console.log('database connected');

})

module.exports = db;