const moment = require('moment')
const jwt = require('../services/jwt')

const SECRET_KEY = "mySecretKey"

function ensureAuth(req, res, next) {

    if(!req.headers.authorization)
        return res.status(403).send({msg: 'The request has no authentication header'})

    const token = req.headers.authorization.replace(/['"]+/g, "")

    try{
        const payload = jwt.decodeToken(token, SECRET_KEY)
        if(payload.exp <= moment().unix())
            return res.status(404).send({msg: "Token has expired"})
    } catch(error){
        return res.status(404).send({msg: "Invalid token"})
    }

    req.user = payload
    next()
}

module.exports = {
    ensureAuth
}