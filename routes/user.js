const express = require('express')
const UserController = require("../controllers/user")

const md_auth = require('../middlewares/authenticated')

const api = express.Router()

api.post('/register', UserController.register)
api.post('/login', UserController.login)
api.get("/protected",[md_auth.ensureAuth], UserController.protected)
module.exports = api