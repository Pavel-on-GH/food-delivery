import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import { connectDB } from './config/db.js';
import { foodRouter } from './routes/foodRoute.js';
import { userRouter } from './routes/userRoute.js';
import { basketRouter } from './routes/basketRoute.js';

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: process.env.VITE_FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(express.json());
app.use(cors(corsOptions));

connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/basket', basketRouter);

app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

app.listen(port, () => {
  console.log(`Сервер запущен на: http://localhost:${port}`);
});
