import express from 'express'
import { Request, Response } from 'express'
import { createServer } from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import userRouter from './routes/user.router'


require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI as string
const app = express()

const http = createServer(app)

const io = new Server(http,{
    cors:{
        origin:'http://localhost:4200',
        methods:["GET","POST"],
        credentials:true
    }
})

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json())
app.use('/theFucaChat', userRouter)

app.get('/', (req:Request, res:Response)=>{
    res.send('hello')
})


mongoose.connect(MONGO_URI,{
    dbName:'theFucaChat'
}).then(()=>{
    console.log('Conectado a MongoDB');
    http.listen(3001,()=>{
        console.log('servidor corriendo');
    })
    
    io.on("connection",(socket)=>{
        console.log('cliente conectado', socket.id)
        
        socket.on("chatMessage",(message)=>{
            io.emit("chatMessage", message)
        })
    
        socket.on("disconnect", () => {
            console.log("Cliente desconectado:", socket.id);
          });
        
    })
}).catch((err)=>{
    console.log('error al conectar con la base de datos',err);
})



