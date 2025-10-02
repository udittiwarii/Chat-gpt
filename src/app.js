const express = require('express')
const cookieParser = require('cookie-parser')

// routes api
const authRouter = require('./routes/auth.routes')
const chatRouter = require("./routes/chat.routes")

const app = express();

// middlewares
app.use(express.json())
app.use(cookieParser())

// routes api's
app.use('/api/auth/', authRouter)// authentication router
app.use('/api/chat', chatRouter) // chat router


module.exports = app