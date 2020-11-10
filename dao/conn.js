const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10, //最大连接数
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mi'
});
// console.log(1);
module.exports = pool;