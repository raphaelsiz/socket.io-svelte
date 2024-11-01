import http from 'http'
import express from 'express'
import injectSocketIO from './socketIoHandler,js'
import {handler} from '../build/handler.js'

const app = express()
const server = http.createServer(app)

injectSocketIO(server)

app.use(handler)

server.listen(3000,()=>{
    console.log("Server running on http://localhost:3000")
})