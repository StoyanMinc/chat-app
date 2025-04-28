import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './lib/db.js';
import router from './router.js';
import { clearTokens } from './utils/tokens.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router)

app.get('/', (req, res) => {
    res.send('hi')
});

app.listen(PORT, () => {
    console.log(`SERVER IS LISTENING ON PORT: ${PORT}...`)
    connectDB();
    clearTokens()
});

