require('dotenv').config()
const app = require('./src/app')
const ConnectDB = require('./src/db/db')
const initsocket = require('./src/sockets/socket.server')
const httpServer = require('http').createServer(app)

ConnectDB()// calling mongodb to connect
initsocket(httpServer)


httpServer.listen(3000, () => {
    console.log('server is running on port 3000')// start surver
})