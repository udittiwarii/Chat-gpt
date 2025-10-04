const express = require('express')
const authcontroller = require('../controllers/auth.controller')

const router = express.Router()

// /api/auth/
router.post('/register', authcontroller.registerUser) // register api 
router.post('/login', authcontroller.loginUser) // login api 


module.exports = router;
