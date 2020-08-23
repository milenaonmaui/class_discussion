const express = require('express')
const {userSignupValidator} = require('../validator/index')
const { signup, signin } = require('../controllers/auth')

const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
module.exports = router;