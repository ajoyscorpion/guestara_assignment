// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require("./db/connection")

// Create express server
const server = express()
//allow cross-origin requests
server.use(cors())
//parse incoming JSON requests
server.use(express.json())
//handling different routes
server.use(router)

// server port, either from the environment variable or default to 4000
const PORT = 4000 | process.env.PORT

server.listen(PORT,()=>{
    console.log(`Guestara Assignment started at port : ${PORT}`);
})

server.get('/',(req,res)=>{
    res.send('Guestara Assignment started')
})