
const express = require('express')
const { userById, getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { requireSignin} = require('../controllers/auth');

const router = express.Router();


router.get('/users', getAllUsers)
router.get('/user/:userId', requireSignin, getUser)
router.param("userId", userById)
router.put('/user/:userId', requireSignin, updateUser)
router.delete('/user/:userId', requireSignin, deleteUser)
module.exports = router;