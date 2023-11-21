const express = require('express')
const app = express()

const hello_routes = require('./routes/hello')

app.use('/api', hello_routes)

module.exports = app