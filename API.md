# API Reference

The backend exposes REST endpoints under `/api` and real-time chat events over Socket.IO.

Base URL for local backend:

```text
http://localhost:3000
```

## Authentication

Authentication uses a JWT stored in a `token` cookie. Protected routes require that cookie.

### Register

```http
POST /api/auth/register
```

Body:

```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "Ada",
    "lastname": "Lovelace"
  },
  "password": "password123"
}
```

Creates a user, sets the auth cookie, and returns basic user details.

### Login

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Sets the auth cookie and returns basic user details.

### Logout

```http
POST /api/auth/logout
```

Clears the auth cookie.

### Current User

```http
GET /api/auth/me
```

Requires authentication. Returns the current user profile.

## Chats

All chat routes require authentication except where noted.

### Create Chat

```http
POST /api/chat
```

Body:

```json
{
  "title": "New Chat"
}
```

Creates a chat for the current user.

### List Chats

```http
GET /api/chat
```

Returns the current user's chats.

### Get Chat Messages

```http
GET /api/chat/message/:chatId
```

Returns messages for a chat, sorted oldest to newest.

### Delete Chat

```http
DELETE /api/chat/:chatId
```

Deletes the chat and its messages.

### Update Chat Title

```http
PUT /api/chat/title/:chatId
```

Body:

```json
{
  "title": "Updated title"
}
```

Updates the chat title.

### Toggle Archive

```http
PUT /api/chat/archive/:chatId
```

Toggles the chat's archived state.

Note: this route is currently not protected by auth middleware in the code.

## Socket.IO

Socket URL for local backend:

```text
http://localhost:3000
```

The Socket.IO server reads the `token` cookie during connection. If a valid token exists, the socket is attached to the authenticated user. If not, the socket continues as a guest.

### Send Authenticated or Guest Message

Event:

```text
ai-message
```

Payload:

```json
{
  "chat": "chat_id_for_authenticated_users",
  "content": "Hello"
}
```

Behavior:

- Authenticated users get persistent chat history and Pinecone memory.
- Guest users get a limited number of messages during the socket session.

### Start Temporary Chat

Event:

```text
Start-temporary
```

Payload:

```json
{
  "content": "Give me a short answer"
}
```

Uses temporary in-memory context for the socket session.

### AI Response

Event:

```text
ai-response
```

Payload:

```json
{
  "content": "AI response text",
  "chat": "chat_id_when_available"
}
```

### Chat Title Updated

Event:

```text
chat-title-updated
```

Payload:

```json
{
  "chatId": "chat_id",
  "title": "Generated title"
}
```

Emitted when the backend auto-generates a title for a new chat.
