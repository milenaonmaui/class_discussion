
const express = require('express')
const { userById, getAllUsers, getUser, updateUser } = require('../controllers/user')
const { requireSignin} = require('../controllers/auth');

const router = express.Router();


router.get('/users', getAllUsers)
router.get('/user/:userId', requireSignin, getUser)
router.param("userId", userById)
router.put('/user/:userId', requireSignin, updateUser)
module.exports = router;