const express = require('express')
const multipart = require('connect-multiparty')
const UserController = require("../controllers/user")

const md_auth = require('../middlewares/authenticated')
const md_upload_avatar = multipart({ uploadDir: './uploads'})
const api = express.Router()

api.post('/register', UserController.register)
api.post('/login', UserController.login)
api.get("/protected",[md_auth.ensureAuth], UserController.protected)
api.put('/upload-avatar/:id', [md_auth.ensureAuth, md_upload_avatar], UserController.uploadAvatar)
api.get("/avatar/:avatarName", UserController.getAvatar)

module.exports = api