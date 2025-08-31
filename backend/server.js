import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { foodRouter } from './routes/foodRoutes.js';

const app = express();
const port = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/food', foodRouter);

app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

app.listen(port, () => {
  console.log(`Сервер запущен на: http://localhost:${port}`);
});
