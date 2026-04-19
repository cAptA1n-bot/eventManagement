import express from 'express'
import authmiddleware from '../middlewares/authmiddleware.js'
import eventControllers from '../controllers/eventControllers.js';

const eventRouter = express.Router();

eventRouter.post("/", authmiddleware, eventControllers.createEvent);
eventRouter.get("/", authmiddleware, eventControllers.getEvents);

export default eventRouter;