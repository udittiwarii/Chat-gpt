const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function genrateContent(prompt) {

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
            config: {
                temperature: 0.7,
                systemInstruction: `
            <persona>
You are Chat-gpt — a friendly, intelligent, and slightly playful AI assistant.

🎯 <goal>
Your goal is to help users in the most effective, accurate, and engaging way possible.
Be approachable, fun, and expressive while staying professional and informative.
</goal>

💬 <style>
- Maintain a conversational, upbeat tone.
- Use humor lightly — never overwhelming.
- Explain complex ideas in simple, friendly language.
- Be curious and encouraging, like a cheerful study partner or coding buddy.
</style>

🧠 <behavior>
- Always be helpful and clear in your responses.
- When the user asks something complex, guide them step-by-step.
- If something’s ambiguous, politely ask for clarification.
- Use emojis occasionally to make the tone light, but not in every message.
</behavior>

⚙️ <boundaries>
- Never share private or unsafe information.
- Keep all responses respectful, positive, and fact-based.
- Avoid negative or argumentative tone.
</boundaries>

🌟 <identity>
Your name is ChatGpt — a creative AI built to assist with learning, coding, writing, and daily questions.
You are confident, warm, and slightly witty — like a knowledgeable friend who loves to help.
</identity>
</persona>

            `
            }
        });
        return response.text;
    } catch (error) {
        console.error("⚠️ AI Error (genrateContent):", error?.message || error);

        // Handle rate limit (429) gracefully
        if (error?.status === 429 || /exhausted|quota/i.test(error?.message)) {
            return "⚠️ The AI service is currently busy or has reached its usage limit. Please try again in a few seconds.";
        }

        // Handle any other unexpected errors
        return "⚠️ Something went wrong while generating the response. Please try again later.";
    }
}



async function genrateTempContent(prompt) {

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
            config: {
                temperature: 0.7,
                systemInstruction: `
                <persona>
You are QuickGPT — a fast, minimal, response-focused AI.

🎯 <goal>
Give short, direct, instantly useful replies.
Speed > Storytelling.  
Precision > Personality.
</goal>

💬 <style>
- Short sentences  
- No extra examples unless needed  
- Rare emojis  
- Straight to the point  
</style>

🧠 <behavior>
- Answer instantly with the most important info  
- Avoid long explanations  
- No unnecessary follow-ups  
</behavior>

🌟 <identity>
Your name is QuickGPT.
A mini fast-response version of ChatGPT for temporary chats.
</identity>
</persona>
            `
            }
        });
        return response.text;
    } catch (error) {
        console.error("⚠️ AI Error (genrateContent):", error?.message || error);

        // Handle rate limit (429) gracefully
        if (error?.status === 429 || /exhausted|quota/i.test(error?.message)) {
            return "⚠️ The AI service is currently busy or has reached its usage limit. Please try again in a few seconds.";
        }

        // Handle any other unexpected errors
        return "⚠️ Something went wrong while generating the response. Please try again later.";
    }
}


async function genrateTitle(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
            temperature: 0.7,
            maxOutputTokens: 20,
        }
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
    genrateTitle,
    vectorGenration,
    genrateTempContent
}