const express = require("express");

const authMiddleware = require("../middleware/auth.middleware")
const chatController = require("../controllers/chat.controller")



const router = express.Router();


// post --> api/chat/
router.post('/',
    authMiddleware.authUser,
    chatController.createChat
)

// get --> api/chat

router.get('/', authMiddleware.authUser, chatController.getChat)

// get --> api/chat/message/:chatId
router.get('/message/:chatId', authMiddleware.authUser, chatController.getMessage)

// delete --> api/chat/message/:chatId
router.delete('/:chatId', authMiddleware.authUser, chatController.deleteChat)

// put --> api/chat/title/:chatId
router.put('/title/:chatId', authMiddleware.authUser, chatController.Updatetitle)

module.exports = router;