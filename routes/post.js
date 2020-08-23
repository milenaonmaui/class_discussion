const express = require('express')
const validator = require('../validator/index')
const {getPosts, createPost} = require('../controllers/post')
const { requireSignin} = require('../controllers/auth');

const router = express.Router();

router.get('/', requireSignin, getPosts);
router.post('/post', validator.createPostValidator, createPost);

module.exports = router;