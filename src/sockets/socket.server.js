const { Server } = require("socket.io"); // require the socket io server
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const aiService = require('../service/ai.service') // require the ai service to get the ai response
const messageModel = require('../models/message.model')
const { createMemmory, queryMemmory } = require('../service/Vectordatabase.service') // require the vector database service to store and query the vectors



function initsocket(httpserver) {
    const io = new Server(httpserver, {})// create a new socket io server


    // middleware for socket io to authenticate the user
    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || '')// parse the cookies from the socket handshake headers 

        if (!cookies.token) {
            return next(new Error('Authentication error , token not found '))// if token not found
        }

        try {

            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET)


            const user = await userModel.findOne(decoded.id)

            socket.user = user // set the user to the socket object 

            next(); // call the next middleware or the connection event


        } catch (err) {
            return next(new Error('Authentication error , token invalid'))// if token is invalid
        }
    })

    // socket connection event
    io.on("connection", (socket) => {


        socket.on('ai-message', async (messagePayload) => {
            /*
            messagePayload = {
            chat: chatId,
            content: messsage text content 
            } 
            */

            /*  save the user message in the database*/
            const message = await messageModel.create({
                user: socket.user._id,
                chat: messagePayload.chat,
                content: messagePayload.content,
                role: 'user'
            })

            const vectors = await aiService.vectorGenration(messagePayload.content)

            const queryResults = await queryMemmory({
                queryVector: vectors,
                limit: 3,
                metadata: {
                    userId: socket.user._id
                }
            })

            await createMemmory({
                vectors,
                metadata: {
                    userId: socket.user._id,
                    chat: messagePayload.chat,
                    text: messagePayload.content
                },
                messageId: message._id.toString()
            })

            const chatHistory = (await messageModel.find({
                chat: messagePayload.chat
            }).sort({ createdAt: -1 }).limit(10).lean()).reverse()


            const stm = chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            })

            const ltm = [
                {
                    role: "user",
                    parts: [{
                        text: `

                        these are some previous messages from the chat, use them to generate a response

                        ${queryResults.map(item => item.metadata.text).join("\n")}
                        
                        ` }]
                }
            ]



            console.log('long term memory ', ltm[0].parts[0].text)
            console.log('short term memory ', stm)


            const finalprompt = [...ltm, ...stm]

            const response = await aiService.getAIResponse(finalprompt) // get the ai response from the ai service

            /* save the ai response in the database*/
            const aimessage = await messageModel.create({
                user: socket.user._id,
                chat: messagePayload.chat,
                content: response,
                role: 'model'
            })

            const responseVectors = await aiService.vectorGenration(response)

            await createMemmory({
                messageId: aimessage._id,
                vectors: responseVectors,
                metadata: {
                    userId: socket.user._id,
                    chat: messagePayload.chat,
                    text: response
                }
            })

            // emit the ai-response event to the client
            socket.emit('ai-response', {
                content: response,
                chat: messagePayload.chat
            })
        })

    })
}


module.exports = initsocket