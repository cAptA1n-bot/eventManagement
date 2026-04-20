import express from 'express';
import authMiddleware from '../middlewares/authmiddleware';
const registrationRouter = express.Router();

registrationRouter.post('/', authMiddleware)

export default registrationRouter;