const bcrypt = require('bcryptjs')
const User = require("../models/user")
const jwt = require('../services/jwt')

async function register(req, res) {
    const user = new User(req.body)
    const {email, password} = req.body 
    try{
        if(!email)throw { msg: "Email is obligatory"} 
        if(!password)throw { msg: "Password is obligatory"}

        const foundEmail = await User.findOne({email})
        if(foundEmail) throw { msg: "Email is already on use"}

        const salt = bcrypt.genSaltSync(10)
        user.password = await bcrypt.hash(password, salt)
        user.save()

        res.status(200).send(user)
    } catch (error){
        res.status(500).send(error)
    }
}

async function login(req, res) {
    const { email, password } = req.body

    try{
        const user = await User.findOne({ email })
        if(!user) throw { msg: "User is not registered, or email is wrong"}

        const passwordSuccess = await bcrypt.compare(password, user.password)
        if(!passwordSuccess) throw { msg: 'Password is not correct'}

        res.status(200).send({ token: jwt.createToken(user, "12h")})
    } catch (error){
        res.status(500).send(error)
    }
}

module.exports = {
    register,
    login
}