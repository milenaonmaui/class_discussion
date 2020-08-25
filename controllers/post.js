const formidable = require('formidable')
const Post = require('../models/post')
//need access to file system
const fs=require('fs')
const { openStdin } = require('process')


const getPosts=(req, res) => {
   
    const posts = Post.find()
        .populate("postedBy", "_id, name")
        .select("_id title body")
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

const postsByUser = (req, res) => {
    Post.find({postedBy: req.profile._id})
        .populate("postedBy", "_id, name")
        .sort("_created")
        .exec((err, posts) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(posts)
        })
}

//if post id in route execute this method to 
//find it and add it to the request
const addPostToRequest = (req, res, next, id) => {
    Post.findById(id)
        .populate("postedBy", "id name")
        .exec((err, post) => {
            if(err || !post) {
                return res.status(400).json({
                    error: err
                })
            }
            //if post found, add to request
            req.post = post
            next()
        })
}

const isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id
    
    //Debug
    // console.log("req.post ", req.post)
    // console.log("req.auth ", req.auth)
    // console.log("req.post.postedBy._id ", req.post.postedBy._id);
    // console.log("req.auth._id", req.auth._id)
    if(!isPoster) {
        return res.status(403).json({
            error: "Unauthhorized action!"
        })
    }
    next()
}

const deletePost = (req, res) => {
    let post = req.post
    post.remove((err, post) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: "Post deleted successfully!"
        })
    })
}
module.exports = {
    getPosts,
    createPost,
    postsByUser,
    addPostToRequest,
    isPoster,
    deletePost
}