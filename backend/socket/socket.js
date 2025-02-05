
import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000", // VITE frontend URL
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

export const getReceiverSocketID = (receiverID) => {
	return userSocketMap[receiverID];
};

const userSocketMap = {}; // { userID: socketID }

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    const userID = socket.handshake.query.userID;
    if (userID != 'undefined') userSocketMap[userID] = socket.id;

    io.emit('getOnlineUser', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('a user disconnect', socket.id);
        delete userSocketMap[userID];
        io.emit('getOnlineUser', Object.keys(userSocketMap));

    })
})

export { app, io, server };