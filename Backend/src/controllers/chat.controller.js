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



async function getChat(req, res) {
    const user = req.user

    try {
        const userChat = await chatModel.find({ user: user._id })

        res.status(200).json({
            message: "Chat fetched successfully ",
            chats: userChat.map(chat => ({
                _id: chat._id,
                title: chat.title,
                userlastactivity: chat.lastactivity,
                Chatuser: chat.user
            }))
        })
    } catch (err) {
        res.status(400).json({
            message: ' Error to fetching chats '
        })
    }
}

module.exports = {
    createChat,
    getChat
}