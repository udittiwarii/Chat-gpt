// Import the Pinecone library
const { Pinecone } = require('@pinecone-database/pinecone')

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY })


const chatgptIndex = pc.Index('chatgpt');

async function createMemmory({ vector, metadata, messageId }) {
      if (!vector || !Array.isArray(vector) || vector.length === 0) {
        throw new Error('Invalid vector: Must be a non-empty array of numbers');
    }
    await chatgptIndex.upsert([{
        id: messageId,
        values: vector,
        metadata: metadata
    }])
}


async function queryMemmory({ queryvector, limit = 5, metadata }) {
    const result = await chatgptIndex.query({
        vector: queryvector,
        topK: limit,
        filter: metadata ? metadata : undefined,
        includeMetadata: true
    })

    return result
}

module.exports = {
    createMemmory,
    queryMemmory
}