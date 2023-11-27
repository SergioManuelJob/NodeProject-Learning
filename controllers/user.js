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

function protected(req, res){
    res.status(200).send({msg: "Content of the endpoint that's protected"})
}

async function uploadAvatar(req, res){
    const params = req.params

    if(req.files){
        const filePath =  req.files.avatar.path
        const fileSplit = filePath.split("\\")
        let fileName = fileSplit[1]
        let extSplit = fileName.split(".")
        let fileExt = extSplit[1]

        if(fileExt !== "png" && fileExt !== "jpg")
            res.status(400).send({msg: "The image extension is invalid. Only .jpg and .png is valid"})

        let user = await User.findById({_id: params.id})
        if(!user) res.status(404).send({ msg: "User could not be found"})
        
        user.avatar = fileName
       
        let userUpdated = await User.findByIdAndUpdate({ _id: params.id}, user)
        console.log(userUpdated.email)
        console.log(userUpdated.password)
        console.log(userUpdated.avatar)
        if(!userUpdated) res.status(400).send({msg: "The user could not be found"})
        else res.status(200).send({msg: "Updated succesfully"})
    }
    

    

    // User.findById({_id: params.id}, (err, userData) => {

    //         if(err) res.status(500).send({ msg: 'Server error'})

    //         if(!userData) res.status(404).send({ msg: "User could not be found"})

    //         let user = userData

    //         if(req.files){
    //             const filePath =  req.files.avatar.path
    //             const fileSplit = filePath.split("/")
    //             let fileName = fileSplit[1]
    //             let extSplit = fileName.split(".")
    //             let fileExt = extSplit[1]

    //             if(fileExt !== "png" && fileExt !== "jpg")
    //                 res.status(400).send({msg: "The image extension is invalid. Only .jpg and .png is valid"})
    //             else {
    //                 user.avatar = fileName
    //                 User.findByIdAndUpdate({ _id: params.id}, user, (err, userResult) => {
    //                     if(err) {
    //                         res.status(500).send({msg: "Server error"})
    //                     }
    //                     if(!userResult) {
    //                         res.status(404).send({ msg: "User could not be found"})
    //                     }
    //                     res.status(200).send({msg: "Updated succesfully"})
    //                 })
    //             }
    //         }

    //     }
    // )
}

module.exports = {
    register,
    login,
    protected,
    uploadAvatar
}