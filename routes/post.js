const express = require('express')
const validator = require('../validator/index')
const {
    getPosts, 
    createPost, 
    postsByUser, 
    addPostToRequest,
    isPoster,
    deletePost,
    updatePost
} = require('../controllers/post')
const { requireSignin} = require('../controllers/auth');
const { userById } = require('../controllers/user');

const router = express.Router();

router.get('/posts',  getPosts);
router.get('/posts/:userId',  requireSignin, postsByUser);
router.post('/post/new/:userId', requireSignin, createPost, validator.createPostValidator);
router.delete('/post/:postId', requireSignin, isPoster, deletePost)
router.put('/post/:postId', requireSignin, isPoster, updatePost)
router.param("userId", userById)
router.param("postId", addPostToRequest)
module.exports = router;