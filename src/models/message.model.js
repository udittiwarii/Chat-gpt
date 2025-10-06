const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chat',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'model'],
        default: 'user'
    }
},
    {
        timestamps: true
    }
)


const messageModel = mongoose.model('message', messageSchema)


module.exports = messageModel;
