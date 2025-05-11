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
export const activeTokens = new Map();

io.on('connection', (socket) => {
    console.log(`A user with id: ${socket.id} is connected!`);

    socket.on('user_is_login', (userData) => {
        console.log('SOCKET CONNECTION:', userData);
        onlineUsers.set(userData.userId, { socketId: socket.id, token: userData.token, timeStamp: userData.timeStamp });
        io.emit('update_online_users', Array.from(onlineUsers.keys()));
        console.log('ONLINE USERS', onlineUsers);
        console.log('ACTIVE TOKENS:', activeTokens);

    })

    socket.on('logout_user', (userId) => {
        onlineUsers.delete(userId);
        io.emit('update_online_users', Array.from(onlineUsers.keys()));
        console.log('ONLINE USERS', onlineUsers);
        console.log('ACTIVE TOKENS:', activeTokens);
    });
    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User: ${socket.id} joined room: ${roomId}`);
    });

    socket.on('disconnect', () => {
        for (const [userId, userData] of onlineUsers) {
            if (socket.id === userData.socketId) {
                onlineUsers.delete(userId);
                break;
            }
        };
        console.log(`A user with id: ${socket.id} is disconnected!`);
    });
});


export { io, app, server }