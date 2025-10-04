const chatModel = require('../models/chat.model')


// controller for creating a new chat

async function chatController(req, res) {

    const { title } = req.body

    const user = req.user

    try {
        // to create the new chat document
        const newChat = await chatModel.create({
            user: user._id,
            title: title
        })

        return res.status(201).json({ message: 'chat created successfully', chat: newChat })

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' })

    }
}


module.exports = chatController
