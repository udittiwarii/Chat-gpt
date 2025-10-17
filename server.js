require('dotenv').config() // require dotenv
const app = require('./src/app')// require app.js
const connectDB = require('./src/db/db') // require db.js
const intialsocket = require('./src/sockets/socket.server')
const httpserver = require('http').createServer(app)

connectDB() // connect to database
intialsocket(httpserver)// call the socket function

// server running 
httpserver.listen(3000, () => {
    console.log("server is running on port 3000")
})