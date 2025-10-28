require('dotenv').config(); // load env vars
const app = require('./src/app'); // import express app
const connectDB = require('./src/db/db'); // correct path
const initSocket = require('./src/sockets/socket.server'); // correct path
const http = require('http');

// create HTTP server
const httpServer = http.createServer(app);

// connect to database
connectDB();

// initialize socket.io
initSocket(httpServer);

// start the server
httpServer.listen(3000, () => {
    console.log("✅ Server is running on port 3000");
});
