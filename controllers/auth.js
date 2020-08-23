const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user')

exports.signup = async (req,res) => {
    const userExists = await User.findOne({email: req.body.email})
    if(userExists) return res.status(403).json({
        error: "Email alredy exists"
    })
    //asynchronous operation - wait for user to be created
    const user = await new User(req.body)
    await user.save()
    //respond with newly created user
    res.status(200).json({message: `User ${user.name} created! Please login.`})
}

exports.signin = (req, res) => {
    //1.Find user
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(401).json({
                error: "User does not exist"
            })
        }
        
        //if user found, authenticate
        if(!user.authenticate(password)) {
            return res.status(401).json({
            error: "Incorrect email and/or password"
            }) 
        }

       
        //generate token if authentication successful
        //token is based on user id 
       
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        
        //persist the token in a cookie
        res.cookie("t", token, {expire: new Date() + 9999})
        //respond with user and token to front end

        const {_id, name, email} = user;
        return res.json({token, user: {_id, name, email} })
           
    })
}

exports.signout = (req,res) => {
    res.clearCookie("t");
    return res.json({message: "Signout success!"})
}