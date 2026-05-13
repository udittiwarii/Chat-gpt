# Contributing

Thanks for improving this project. Keep changes focused, readable, and consistent with the current structure.

## Development Workflow

1. Install dependencies in both `Backend` and `Frontend`.
2. Create `Backend/.env` with the required local secrets.
3. Run the backend with `npm run dev`.
4. Run the frontend with `npm run dev`.
5. Test the changed flow in the browser.

## Code Style

- Follow the existing folder layout.
- Keep backend logic separated into routes, controllers, middleware, models, and services.
- Keep frontend UI pieces inside the existing `Components`, `Pages`, `Context`, `Router`, and `Utils` folders.
- Prefer clear function and variable names over extra comments.
- Do not commit secrets, API keys, database URLs, or `.env` files.

## Before Opening a Pull Request

Run frontend linting:

```bash
cd Frontend
npm run lint
```

Build the frontend:

```bash
cd Frontend
npm run build
```

Start the backend and verify:

- Registration
- Login
- Creating a chat
- Sending an AI message
- Loading previous messages
- Logout

## Documentation Changes

Update the relevant Markdown files when changing:

- Environment variables
- REST routes
- Socket.IO events
- Setup steps
- Deployment behavior

## Security Notes

- Keep `JWT_SECRET`, `MONGODB_URL`, `GEMINI_API_KEY`, and `PINECONE_API_KEY` private.
- Use HTTPS and secure cookie settings in production.
- Review any route that modifies user data to ensure it uses auth middleware.
