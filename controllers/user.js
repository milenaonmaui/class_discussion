const _ = require('lodash');
const User = require("../models/user")

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }
        //if found, create a profile object
        //append to requst with user info
        req.profile = user;
        next()
    })
}

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;

    if(!authorized){
        return res.status(403).json({
            error: "User is not authorized to access resource"
        })
    }
}

exports.getAllUsers = (req,res) => {
    User.find((err,users) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({users})
    }).select("name email updated created")
}

//profile object has been added to request
exports.getUser = (req, res) => {
    //remove hashed_password and salt
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
}

exports.updateUser = (req, res, next) => {
    //as long as there is userId in the route
    //the method userById will be executed and there will be req.profile
    //in the request
    let user = req.profile;
    user = _.extend(user, req.body)
    user.updated = Date.now()
    user.save((err)=> {
        if(err) {
            return res.status(400).json({error: "Error updating user"})
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({user})

    })
}

exports.deleteUser = (req, res, next) => {
    let user = req.profile;
    user.remove((err, deletedUser) => {
        if(err) {
            return res.status(400).json({error: "Error deleting user"})
        }
        res.json({message: `User ${deletedUser.name} deleted successfully!`})
    })
}