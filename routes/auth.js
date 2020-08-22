const express = require('express')
const {userSignupValidator} = require('../validator/index')
const { signup } = require('../controllers/auth')

const router = express.Router();

router.post('/signup', userSignupValidator, signup);

module.exports = router;