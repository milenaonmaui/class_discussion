const express = require('express')
const validator = require('../validator/index')
const {getPosts, createPost, postsByUser} = require('../controllers/post')
const { requireSignin} = require('../controllers/auth');
const { userById } = require('../controllers/user');

const router = express.Router();

router.get('/',  getPosts);
router.get('/posts/:userId',  requireSignin, postsByUser);
router.post('/post/new/:userId', requireSignin, createPost, validator.createPostValidator);

router.param("userId", userById)
module.exports = router;