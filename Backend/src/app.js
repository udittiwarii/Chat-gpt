const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const path = require('path')

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
app.use(express.static(path.join(__dirname , '../public')))

// routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// this is the for public deploy  frontend at the backend path
app.get("*name" , (req, res)=>{
    res.sendFile(path.join(__dirname , "../public/index.html")) 
})

module.exports = app;
