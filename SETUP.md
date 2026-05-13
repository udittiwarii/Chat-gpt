# Setup Guide

This guide explains how to run the project locally and which external services are required.

## 1. Install Dependencies

Backend:

```bash
cd Backend
npm install
```

Frontend:

```bash
cd Frontend
npm install
```

## 2. Configure Environment Variables

Create a `.env` file inside `Backend/`.

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
```

### Variable Reference

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URL` | Yes | MongoDB connection string used by Mongoose |
| `JWT_SECRET` | Yes | Secret used to sign and verify auth cookies |
| `GEMINI_API_KEY` | Yes | API key used by `@google/genai` |
| `PINECONE_API_KEY` | Yes | API key used for vector memory storage |

## 3. Prepare Pinecone

The backend currently connects to a Pinecone index named `chatgpt`.

Expected embedding size:

```text
768 dimensions
```

Create the index in Pinecone before sending authenticated AI messages that use memory.

## 4. Run Locally

Start the backend:

```bash
cd Backend
npm run dev
```

Start the frontend:

```bash
cd Frontend
npm run dev
```

Open the frontend at:

```text
http://localhost:5173
```

## 5. Align Local URLs

Current code values:

| File | Current value |
| --- | --- |
| `Backend/server.js` | Backend listens on `3000` |
| `Backend/src/app.js` | CORS allows `http://localhost:5173` |
| `Frontend/src/Utils/serverapi.js` | REST base URL is `http://localhost:5000/api` |
| `Frontend/src/Utils/socket.js` | Socket URL is the deployed Render URL |

For local development, make the frontend REST and socket URLs point to your local backend.

Suggested local values:

```js
// Frontend/src/Utils/serverapi.js
baseURL: "http://localhost:3000/api"
```

```js
// Frontend/src/Utils/socket.js
const socket = io("http://localhost:3000", {
  withCredentials: true,
});
```

## 6. Build Frontend for Backend Hosting

The backend serves static files from `Backend/public`. If you want Express to serve the production frontend, build the frontend and copy the build output into `Backend/public`.

```bash
cd Frontend
npm run build
```

Then place the generated Vite build files in:

```text
Backend/public
```

## Troubleshooting

### Authentication always fails

Check that:

- `JWT_SECRET` exists in `Backend/.env`
- Cookies are enabled in the browser
- Frontend requests use `withCredentials` where needed
- CORS origin matches the frontend URL

### AI responses fail

Check that:

- `GEMINI_API_KEY` is valid
- The Gemini API quota has not been exceeded
- The backend terminal does not show SDK errors

### Memory search fails

Check that:

- `PINECONE_API_KEY` is valid
- A Pinecone index named `chatgpt` exists
- The index supports 768-dimensional vectors
