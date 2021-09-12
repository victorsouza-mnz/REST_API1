const pgp = require('pg-promise')()

const db = pgp({
    user: 'postgres',
    host: 'localhost',
    password: '123',
    port: 5432,
    database: 'blog'
})


module.exports = db