const formidable = require('formidable')
const Post = require('../models/post')
//need access to file system
const fs=require('fs')


const getPosts=(req, res) => {
    console.log('received request', req.auth)
    const posts = Post.find().select("_id title body")
    .then(((posts) => {
        res.status(200).json({
            posts: posts
        })
    }))
    .catch(err => console.log(err))
}



const createPost = (req,res, next) => {
    let form = new formidable.IncomingForm();
    //keep file extensions
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            res.status(400).json({
                error: "Error uploading image"
            })

        }
        //create a new post based on fields of request
        let post = new Post(fields)
        //assign post to user which is found in request profile
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;
        console.log("Posted By ", req.profile)
        //if there is photo

        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type;
        }
        post.save((err,result) => {
            if(err){
                return res.status(400).json({
                    error: "Error saving post"
                })
            }
            res.json(result)
        })
    })
    
}

module.exports = {
    getPosts,
    createPost
}