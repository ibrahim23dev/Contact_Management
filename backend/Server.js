const express = require('express');
const app = new express();
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const http = require('http')
const server = http.createServer(app)
const {
    dbConnect
} = require('./Src/Utils/db');
require('dotenv').config()
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', require('./Src/Router/AuthRouter'))

app.use('/api', require('./Src/Router/ContactRouter'))
const port = process.env.PORT
dbConnect()
server.listen(port, () => {
    console.log(`Server is Running Success on PORT: ${port}`);
});
