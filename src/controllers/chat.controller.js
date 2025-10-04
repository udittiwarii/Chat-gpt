const chatModel = require('../models/chat.model')


// controller for creating a new chat

async function createChat(req, res) {

    const { title } = req.body // get the title from the req body

    const user = req.user //get the user from the req object set by auth middleware

    try {
        // to create the new chat document
        const newChat = await chatModel.create({
            user: user._id,
            title: title
        })

        return res.status(201).json({ message: 'chat created successfully', chat: newChat })

    } catch (err) {
         console.log('error: ' , err)
        return res.status(500).json({ message: 'Internal server error'  })
    }
}


module.exports = {
    createChat
}