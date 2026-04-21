import express from 'express';
import authMiddleware from '../middlewares/authmiddleware.js';
import registrationControllers from '../controllers/registrationControllers.js';
const registrationRouter = express.Router();

registrationRouter.post('/:eventid', authMiddleware, registrationControllers.register);
registrationRouter.patch('/:eventid', authMiddleware, registrationControllers.unregister);

export default registrationRouter;