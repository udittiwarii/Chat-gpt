# Chat-gpt Frontend

React + Vite frontend for the Chat-gpt full-stack AI chat application.

## What It Does

- Handles login and registration screens
- Stores current user context
- Displays chat history and chat messages
- Sends messages through Socket.IO
- Uses REST calls for auth and chat management
- Provides chat sidebar controls such as new chat, archive, and chat selection

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Axios
- Socket.IO Client
- React Router
- Lucide React
- React Icons

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

The Vite app usually runs at:

```text
http://localhost:5173
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Local Backend URLs

REST calls are configured in:

```text
src/Utils/serverapi.js
```

Socket.IO is configured in:

```text
src/Utils/socket.js
```

For local development, point both to your backend server. The backend currently starts on `http://localhost:3000`.

## Main Folders

```text
src/
+-- Components/      # Reusable UI and chat components
+-- Context/         # User context
+-- Pages/           # Login, register, and home pages
+-- Router/          # App routes
+-- Utils/           # API and socket clients
+-- App.jsx
+-- index.css
+-- main.jsx
```
