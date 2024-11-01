import { Server } from "socket.io";
import { nanoid } from "nanoid";

export default function injectSocketIO(server) {
    const io = new Server(server);
    io.on('connection',socket=>{
        let username = nanoid()
        socket.emit('name',username)
        console.log(username,"connected")
        socket.on('message',(message)=>{
            io.emit('message',{
                from: username,
                message: message,
                time: new Date().toLocaleString()
            })
        })
    })
}