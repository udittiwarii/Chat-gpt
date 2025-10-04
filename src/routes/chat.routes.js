const express = require('express')

const authMiddleware = require('../middleware/auth.middleware')// require auth middleware
const chatController = require('../controllers/chat.controller')// require chat controller

const router = express.Router()

// post /api/chat/
router.post('/', authMiddleware, chatController)

module.exports = router;