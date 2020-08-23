const express = require('express')
const validator = require('../validator/index')
const {getPosts, createPost} = require('../controllers/post')
const { requireSignin} = require('../controllers/auth');

const router = express.Router();

router.get('/',  getPosts);
router.post('/post', requireSignin, validator.createPostValidator, createPost);

module.exports = router;