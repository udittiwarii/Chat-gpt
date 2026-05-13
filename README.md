# Chat-gpt

A full-stack AI chat application with authentication, chat history, real-time Socket.IO messaging, Gemini-powered responses, and Pinecone-backed long-term memory.

## Features

- User registration, login, logout, and profile lookup
- Authenticated chat creation, listing, title updates, archiving, and deletion
- Real-time AI responses through Socket.IO
- Guest chat mode with a limited message count
- Temporary chat mode for short-lived conversations
- MongoDB persistence for users, chats, and messages
- Gemini content generation and embeddings
- Pinecone vector search for memory retrieval
- React + Vite frontend with a sidebar-driven chat UI

## Tech Stack

**Frontend**

- React 19
- Vite
- Tailwind CSS
- Axios
- Socket.IO Client
- Lucide React and React Icons

**Backend**

- Node.js
- Express 5
- Socket.IO
- MongoDB with Mongoose
- JWT and cookies
- Google GenAI SDK
- Pinecone

## Project Structure

```text
.
+-- Backend/
|   +-- public/                 # Built frontend assets served by Express
|   +-- src/
|   |   +-- controllers/        # Auth, chat, and socket handlers
|   |   +-- db/                 # MongoDB connection
|   |   +-- middleware/         # Auth middleware
|   |   +-- model/              # Mongoose models
|   |   +-- routes/             # REST routes
|   |   +-- service/            # Gemini and Pinecone services
|   |   +-- sockets/            # Socket.IO server setup
|   |   +-- app.js              # Express app
|   +-- server.js               # HTTP server bootstrap
+-- Frontend/
|   +-- public/
|   +-- src/
|       +-- Components/
|       +-- Context/
|       +-- Pages/
|       +-- Router/
|       +-- Utils/
+-- API.md
+-- CONTRIBUTING.md
+-- SETUP.md
```

## Prerequisites

- Node.js 20 or newer
- npm
- MongoDB database
- Google Gemini API key
- Pinecone API key and an index named `chatgpt`

## Quick Start

Install backend dependencies:

```bash
cd Backend
npm install
```

Install frontend dependencies:

```bash
cd ../Frontend
npm install
```

Create `Backend/.env`:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
```

Run the backend:

```bash
cd Backend
npm run dev
```

Run the frontend:

```bash
cd Frontend
npm run dev
```

By default, the backend listens on `http://localhost:3000`, while the frontend development server runs on `http://localhost:5173`.

## Important Local Development Note

The current backend starts on port `3000`, but `Frontend/src/Utils/serverapi.js` uses `http://localhost:5000/api` for REST calls. For local development, update the frontend base URL to match the backend port, or update the backend to listen on `5000`.

The current frontend socket client points to the deployed Render URL in `Frontend/src/Utils/socket.js`. Change it to `http://localhost:3000` if you want local Socket.IO traffic.

## Documentation

- [SETUP.md](SETUP.md) covers environment variables and local development details.
- [API.md](API.md) documents REST endpoints and Socket.IO events.
- [CONTRIBUTING.md](CONTRIBUTING.md) describes the expected workflow for future changes.
- [Frontend/README.md](Frontend/README.md) contains frontend-specific notes.

## Scripts

Backend:

```bash
npm run dev
npm test
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## License

This project is currently marked as `ISC` in `Backend/package.json`.
