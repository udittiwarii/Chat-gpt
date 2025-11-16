const express = require("express");


// contorllers 
const authController = require('../controllers/auth.controller')
// authmiddleware to chack the user is login and not 
const authmiddleware = require('../middleware/auth.middleware')

const router = express.Router();

// register user
router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)// login user
router.post('/logout', authController.logoutUser) // logout user

// get my profile
router.get('/me', authmiddleware.authUser, authController.getMyProfile)

module.exports = router;
