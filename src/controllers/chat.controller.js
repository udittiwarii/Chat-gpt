const chatModel = require('../model/chat.model');

async function createChat(req, res) {
    const { title } = req.body;

    const user = req.user

    try {
        const newChat = await chatModel.create({
            user: user._id,
            title: title
        })

        return res.status(201).json({
            message: "Chat created successfully",
            chat: newChat
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            err
        })
    }
}

module.exports = {
    createChat
}