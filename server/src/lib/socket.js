import express from 'express';

import { Server } from 'socket.io';
import http from 'http';
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`A user with id: ${socket.id} is connected!`);

    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User: ${socket.id} joined room: ${roomId}`);
    });

    socket.on('send_message', (messageData) => {
        const { roomId } = messageData;
        socket.to(roomId).emit('receive_message', messageData);
        console.log(`Send message:${messageData} to room: ${roomId}`)
    });

    // socket.emit('receive_message', (messageData) => {

    // })


    socket.on('disconnect', () => {
        console.log(`A user with id: ${socket.id} is disconnected!`);
    });
});


export { io, app, server }