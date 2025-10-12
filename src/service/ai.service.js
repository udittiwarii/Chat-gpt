const { GoogleGenAI } = require('@google/genai') // require googlegenai 


const ai = new GoogleGenAI({})// initialize the google gen ai client


async function getAIResponse(content) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash', // model of the gemini 
        contents: content // the prompt or the message content
    })

    return response.text  // to return the response for teh prompt(content)
}

async function vectorGenration(content) {
    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: content,
        config: {
            outputDimension: 768
        }
    })

    const fullvector = response.embeddings[0].values;
    const turnedVector = fullvector.slice(0, 768)
    return turnedVector // to return the response for teh prompt(content)
}


module.exports = {
    getAIResponse,
    vectorGenration
}