import express from 'express';
import multer from 'multer';
import { addFoodItem, foodArr, removeFoodItem } from '../controllers/foodController.js';

export const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post('/add', upload.single('image'), addFoodItem);
foodRouter.get('/food-arr', foodArr);
foodRouter.post('/remove', removeFoodItem);
