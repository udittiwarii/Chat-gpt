const express = require('express');// require express
const cookieParser = require('cookie-parser')

// rotes
const authroutes = require('./routes/auth.routes')
const chatRouter = require('./routes/chat.route')


const app = express();// create an express app

// middleware
app.use(express.json())
app.use(cookieParser());

// routes 
app.use('/api/auth', authroutes)
app.use('/api/chat', chatRouter)


module.exports = app;