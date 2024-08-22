"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("../src/routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Authentication Routes
app.use('/api/auth', authRoutes_1.default);
// WebSocket Connection
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('canvas-data', (data) => {
        socket.broadcast.emit('canvas-data', data);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
// MongoDB Connection
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
// Start Server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// import express from 'express';
// import http from 'http';
// import { Server as SocketIOServer, Socket } from 'socket.io';
// const app = express();
// const server = http.createServer(app);
// const io = new SocketIOServer(server, {
//   cors: {
//     origin: "*",
//   },
// });
// io.on('connection', (socket: Socket) => {
//   console.log('a user connected');
//   socket.on('canvas-data', (data: any) => {
//     socket.broadcast.emit('canvas-data', data);
//   });
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
