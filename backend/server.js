import express from 'express';
import cors from 'cors';

// Конфиг
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Запуск');
});

app.listen(port, () => {
  console.log(`Сервер запущен на: http://localhost:${port}`);
});
