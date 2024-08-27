"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routes/user.router"));
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const app = (0, express_1.default)();
const http = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(http, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/theFucaChat', user_router_1.default);
app.get('/', (req, res) => {
    res.send('hello');
});
mongoose_1.default.connect(MONGO_URI, {
    dbName: 'theFucaChat'
}).then(() => {
    console.log('Conectado a MongoDB');
    http.listen(3001, () => {
        console.log('servidor corriendo');
    });
    io.on("connection", (socket) => {
        console.log('cliente conectado', socket.id);
        socket.on("chatMessage", (message) => {
            io.emit("chatMessage", message);
        });
        socket.on("disconnect", () => {
            console.log("Cliente desconectado:", socket.id);
        });
    });
}).catch((err) => {
    console.log('error al conectar con la base de datos', err);
});
