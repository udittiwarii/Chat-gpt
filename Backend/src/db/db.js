const mongoose = require('mongoose');


function connectDB() {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("connected to db")
        })
        .catch((err) => {
            console.log("error connting to db : ", err)
        })
}

module.exports = connectDB;