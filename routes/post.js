const express = require('express')
const validator = require('../validator/index')
const {getPosts, createPost} = require('../controllers/post')
const { requireSignin} = require('../controllers/auth');
const { userById } = require('../controllers/user');

const router = express.Router();

router.get('/',  getPosts);
router.post('/post/new/:userId', requireSignin, createPost, validator.createPostValidator);
router.param("userId", userById)
module.exports = router;