const express = require('express')
const {userSignupValidator} = require('../validator/index')

const { signup, signin, signout } = require('../controllers/auth')

const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);
//if there is userId in the route, execute userById method first

module.exports = router;