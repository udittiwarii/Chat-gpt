const aiService = require('./../service/ai.service');
const messageModel = require('../model/message.model')
const chatModel = require("../model/chat.model");
const { createMemmory, queryMemmory } = require('../service/Vectordatabase.service');



async function handleTemporaryChat(socket, messagePayload, tempChatMemory) {
    tempChatMemory.push({ role: 'user', parts: [{ text: messagePayload.content }] });

    const response = await aiService.genrateTempContent(tempChatMemory)

    socket.emit('ai-response', { content: response });


    tempChatMemory.push({ role: 'model', parts: [{ text: response }] });
}


async function handleGuestChat(Socket, messagePayload, guestlocalMemory, guestChatCounter, guestChatlimit) {
    if (guestChatCounter >= guestChatlimit) {
        Socket.emit("ai-response", {
            content: "Guest user chat limit exceeded. Please sign up to continue chatting.",
        })
        return;
    }



    guestlocalMemory.push({
        role: 'user',
        parts: [{
            text: `
Guest message #${guestChatCounter + 1} (limit ${guestChatlimit}):

${messagePayload.content}

NOTE: This user is not logged in. AI must remind them politely that guest mode has limited messages.
`
        }]
    });


    const guestResponse = await aiService.genrateContent(guestlocalMemory)


    Socket.emit('ai-response', { content: guestResponse })


    guestlocalMemory.push({
        role: 'model',
        parts: [{ text: guestResponse }]
    })



}


async function handleNormalChat(Socket, messagePayload) {

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
    console.log(stm.length)
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


    if (stm.length < 2) {
        const titlePrompt = `
            Generate a short (max 3 words) title for this chat.
            User: ${messagePayload.content}
            AI: ${response}
            Examples: "Greeting", "Coding Help", "Quick Question"
            `;
        const title = await aiService.genrateTitle(titlePrompt);
        await chatModel.findByIdAndUpdate(messagePayload.chat, {
            title: title.trim(),
        });
        Socket.emit("chat-title-updated", {
            chatId: messagePayload.chat,
            title: title.trim(),
        });
    }


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
}


module.exports = {
    handleTemporaryChat,
    handleGuestChat,
    handleNormalChat
};  