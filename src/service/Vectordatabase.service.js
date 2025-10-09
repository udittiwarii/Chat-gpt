// require the Pinecone library
const { Pinecone } = require('@pinecone-database/pinecone')

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

// Create a dense index with integrated embedding
const chatgptIndex = pc.Index('chatgpt');

async function createMemmory({ vectors, metadata, messageId }) {
    await chatgptIndex.upsert({
        id: messageId,
        values: vectors,
        metadata: metadata
    })
}


async function queryMemmory({ queryVector, limit = 5, metadata }) {
    const results = await chatgptIndex.query({
        vector: queryVector,
        topK: limit,
        filter: metadata ? metadata : undefined,
        includeMetadata: true
    });
    return results.matches;
}

module.exports = {
    createMemmory,
    queryMemmory
};