const mongoose = require('mongoose')

// chat schema  for the user chat detail and the title from the req body and last activity
const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true
    }, title: {
        type: String,
        required: true
    }, lastactivity: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})


// chat model 
const chatModel = mongoose.model('Chat', chatSchema)

module.exports = chatModel