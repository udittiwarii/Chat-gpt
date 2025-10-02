const mongoose = require('mongoose')

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URl)
        console.log('connect to db')
    } catch (err) {
        console.log('Error connecting to DB:', err)
    }
}

module.exports = ConnectDB