const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const SocketController = require("../controllers/Socket.controller");

const guestChatlimit = 4;

async function intialsocket(httpserver) {
    const io = new Server(httpserver, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    // 🔒 Middleware to verify JWT if exists
    io.use(async (Socket, next) => {
        const cookies = cookie.parse(Socket.handshake.headers?.cookie || "");

        if (!cookies.token) {
            Socket.user = null;
            return next();
        }

        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
            const user = await userModel.findById(decoded.id);
            if (!user) return next(new Error("User not found"));

            Socket.user = user;
            next();
        } catch (err) {
            return next(new Error("Authentication error, token invalid"));
        }
    });

    io.on("connection", (Socket) => {

        // --------------------------
        // Session Variables
        // --------------------------
        let guestChatCounter = 0;
        const guestlocalMemory = [];
        const tempChatMemory = [];

        // 🧠 Handle temporary chat activation
        Socket.on("Start-temporary", async (messagePayload) => {
            await SocketController.handleTemporaryChat(Socket, messagePayload, tempChatMemory);
        });

        // 💬 Main AI message handler
        Socket.on("ai-message", async (messagePayload) => {
            try {

                if (!Socket.user) {
                    await SocketController.handleGuestChat(
                        Socket,
                        messagePayload,
                        guestlocalMemory,
                        guestChatCounter,
                        guestChatlimit
                    );
                    guestChatCounter++;
                    return;
                }

                await SocketController.handleNormalChat(Socket, messagePayload);
            } catch (err) {
                Socket.emit("ai-response", {
                    content: "An error occurred while processing your message.",
                });
                console.error("❌ Socket error:", err);
            }
        });

    });
}

module.exports = intialsocket;
