import { io } from "socket.io-client";

const socket = io('http://localhost:3000', {
    withCredentials: true
})

socket.on('connect' , ()=>{console.log('connect h bhai mere')})

export default socket