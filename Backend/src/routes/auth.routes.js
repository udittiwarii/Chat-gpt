const express = require("express");


// contorllers 
const authController = require('../controllers/auth.controller')


const router = express.Router();


router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)


module.exports = router;
