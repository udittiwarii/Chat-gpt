const { Server } = require("socket.io");


function initsocket(httpserver){
    const io = new Server(httpserver , {})

    io.on("connection", (socket)=>{
        console.log("New sokect connnected: " , socket.id)
    })
}


module.exports = initsocket