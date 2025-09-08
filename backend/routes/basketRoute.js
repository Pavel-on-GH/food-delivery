import express from 'express';
import {
  addToBasket,
  getBasket,
  removeFromBasket,
  deleteFromBasket,
  clearBasket,
} from '../controllers/basketController.js';
import { authMiddleware } from '../middleware/auth.js';

export const basketRouter = express.Router();

basketRouter.post('/add', authMiddleware, addToBasket);
basketRouter.post('/remove', authMiddleware, removeFromBasket);
basketRouter.post('/get', authMiddleware, getBasket);
basketRouter.post('/delete', authMiddleware, deleteFromBasket);
basketRouter.post('/clear', authMiddleware, clearBasket);
