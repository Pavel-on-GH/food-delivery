import { loginUser, regUser } from '../controllers/userController.js';
import express from 'express';

export const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', regUser);
