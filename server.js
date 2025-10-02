require('dotenv').config()
const app = require('./src/app')
const ConnectDB = require('./src/db/db')


ConnectDB()// calling mongodb to connect
app.listen(3000, () => {
    console.log('server is running on port 3000')// start surver
})