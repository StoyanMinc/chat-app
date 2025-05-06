import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './lib/db.js';
import { app, server } from './lib/socket.js';
import router from './router.js';
import { clearTokens } from './utils/tokens.js';

dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(router)

app.get('/', (req, res) => {
    res.send('hi')
});

server.listen(PORT, () => {
    console.log(`SERVER IS LISTENING ON PORT: ${PORT}...`)
    connectDB();
    clearTokens()
});

