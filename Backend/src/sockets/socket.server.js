const { Server, Socket } = require("socket.io");
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const userModel = require('../model/user.model')
const aiService = require('../service/ai.service')
const messageModel = require('../model/message.model')
const { createMemmory, queryMemmory } = require('../service/Vectordatabase.service')

async function intialsocket(httpserver,) {
    const io = new Server(httpserver, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true
        }
    });// create socket io server

    io.use(async (Socket, next) => {
        const cookies = cookie.parse(Socket.handshake.headers?.cookie || '')

        if (!cookies.token) {
            return next(new Error('Authentication error , token not found'))
        }

        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET)

            const user = await userModel.findById(decoded.id)

            if (!user) return next(new Error('User not found'));


            Socket.user = user

            next()
        } catch (err) {
            return next(new Error('Authentication error , token invalid'))
        }
    })

    io.on("connection", (Socket) => {
        Socket.on('ai-message', async (messagePayload) => {

            const [message, vectors] = await Promise.all([
                await messageModel.create({
                    user: Socket.user._id,
                    chat: messagePayload.chat,
                    content: messagePayload.content,
                    role: 'user'
                }),
                await aiService.vectorGenration(messagePayload.content)
            ])

            const [queryResult, chatHistory] = await Promise.all([
                await queryMemmory({
                    queryvector: vectors,
                    limit: 3,
                    metadata: {
                        userId: Socket.user._id
                    }
                }),
                (await messageModel.find({
                    chat: messagePayload.chat
                }).sort({ createdAt: -1 }).limit(10).lean()).reverse()
            ]);

            await createMemmory({
                vector: vectors,
                metadata: {
                    userId: Socket.user._id,
                    chatId: messagePayload.chat,
                    text: messagePayload.content
                },
                messageId: message._id.toString()
            });

            const stm = chatHistory.map(itm => {
                return {
                    role: itm.role,
                    parts: [{ text: itm.content }]
                }
            })

            const ltm = [{
                role: 'user',
                parts: [{
                    text: `
                    
                       these are some previous messages from the chat, use them to generate a response


                   ${(queryResult.matches || []).map(item => item.metadata.text).join("\n")}
                    `
                }]
            }]



            const finalPrompt = [...ltm, ...stm]

            const response = await aiService.genrateContent(finalPrompt)

            Socket.emit('ai-response', {
                content: response,
                chat: messagePayload.chat
            })

            const [aimessge, responsevector] = await Promise.all([
                await messageModel.create({
                    user: Socket.user._id,
                    chat: messagePayload.chat,
                    content: response,
                    role: 'model'
                }),
                await aiService.vectorGenration(response)
            ])

            await createMemmory({
                vector: responsevector,
                metadata: {
                    userId: Socket.user._id,
                    chat: messagePayload.chat,
                    text: response
                },
                messageId: aimessge._id
            })

        })
    })
}


module.exports = intialsocket;
