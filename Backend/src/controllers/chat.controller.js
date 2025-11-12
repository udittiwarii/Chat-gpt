const chatModel = require('../model/chat.model');
const messageModel = require('../model/message.model')

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

async function getMessage(req, res) {
    const { chatId } = req.params

    try {
        const messages = await messageModel.find({ chat: chatId }).sort({ createdAt: 1 })
        res.status(200).json({
            message: "Messages Fetched successfully",
            messages: messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }))
        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function deleteChat(req, res) {
    const { chatId } = req.params

    if (!chatId) {
        res.status(500).json({
            message: 'chat id is not found'
        })
    }


    try {

        await chatModel.findOneAndDelete({ _id: chatId })
        await messageModel.deleteMany({ chat: chatId })

        res.status(200).json({
            messge: "deleted successfully"
        })

    } catch (err) {
        res.status.json({
            messge: 'internal server error'
        })
    }
}

const Updatetitle = async (req, res) => {
    const { chatId } = req.params
    const { title } = req.body
    try {
        const chat = await chatModel.findById(chatId)
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        chat.title = title || chat.title;
        await chat.save();
        res.status(200).json({ message: 'Chat title updated successfully', chat });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports = {
    createChat,
    getChat,
    getMessage,
    deleteChat,
    Updatetitle
}                                   