import express from 'express';
import userControllers from '../controllers/userControllers.js';
import authMiddleware from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.get("/me", authMiddleware, userControllers.getProfile);

export default userRouter;