const express = require('express')
const UserController = require("../controllers/user")

const api = express.Router()

api.post('/register', UserController.register)

module.exports = api