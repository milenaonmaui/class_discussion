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