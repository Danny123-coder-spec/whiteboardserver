
import express, { Application, Request, Response } from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../src/routes/authRoutes'

dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Authentication Routes
app.use('/api/auth', authRoutes);

// WebSocket Connection
io.on('connection', (socket: Socket) => {
  console.log('a user connected');

  socket.on('canvas-data', (data: any) => {
    socket.broadcast.emit('canvas-data', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI!)
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

