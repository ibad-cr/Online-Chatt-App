
import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000, https://online-chatt-app-7.onrender.com/'],
        methods: ['GET', 'POST']
    }
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