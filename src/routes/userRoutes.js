import express from 'express';
import userControllers from '../controllers/userControllers.js';
import authMiddleware from '../middlewares/authmiddleware.js';

const userRouter = express.Router();

userRouter.get("/", authMiddleware, userControllers.getProfile);

export default userRouter;