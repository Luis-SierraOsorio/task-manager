// pg library allows conneciton between PostgreSQL and backend
const Pool = require('pg').Pool;
// this is for the hidden files
require('dotenv').config();

// setting up our connections
const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'task-manager'
})

module.exports = pool