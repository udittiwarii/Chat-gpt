const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    fullname: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
    },
    password: {
        type: String,
        required: true

    }
},
    {
        timestamps: true
    }
)

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;