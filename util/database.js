const mysql = require('mysql2')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'rudgus4175'
})

module.exports = pool.promise() //비동기적데이터를 처리!
