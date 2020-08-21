const express = require('express')

const postsController = require('../controllers/post')

const router = express.Router();

router.get('/', postsController.getPosts);
router.post('/post', postsController.createPost);

module.exports = router;