const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

// import routes
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.route');

const app = express();

// middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

module.exports = app;
