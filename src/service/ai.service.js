const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function genrateContent(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    return response.text;
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
    genrateContent,
    vectorGenration
}