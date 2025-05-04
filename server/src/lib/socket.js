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

export const onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log(`A user with id: ${socket.id} is connected!`);

    socket.on('user_is_login', (userId) => {
        onlineUsers.set(userId, socket.id);
        io.emit('update_online_users', Array.from(onlineUsers.keys()));
        console.log(onlineUsers);
    })

    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User: ${socket.id} joined room: ${roomId}`);
    });

    socket.on('logout_user', (userId) => {
        onlineUsers.delete(userId);
        io.emit('update_online_users', Array.from(onlineUsers.keys()));
    });



    socket.on('disconnect', () => {
        console.log(`A user with id: ${socket.id} is disconnected!`);
        for (const [userId, sockedId] of onlineUsers) {
            if (socket.id === sockedId) {
                onlineUsers.delete(userId);
                break;
            }
        };
    });
});


export { io, app, server }