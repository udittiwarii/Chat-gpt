import { io } from "socket.io-client";

const socket = io('https://chatgpt-qpm4.onrender.com', {
    withCredentials: true
})


export default socket