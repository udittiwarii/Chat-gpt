const { GoogleGenAI } = require('@google/genai') // require googlegenai 


const ai = new GoogleGenAI({})// initialize the google gen ai client


async function getAIResponse(content) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash', // model of the gemini 
        contents: content // the prompt or the message content
    })

    return response.text  // to return the response for teh prompt(content)
}


module.exports = {
    getAIResponse
}