import express from 'express'
import authmiddleware from '../middlewares/authmiddleware.js'
import eventControllers from '../controllers/eventControllers.js';
import roleMiddleware from '../middlewares/rolemiddleware.js';

const eventRouter = express.Router();

eventRouter.post("/", authmiddleware, eventControllers.createEvent);
eventRouter.get("/", authmiddleware, eventControllers.getEvents);
eventRouter.get("/me", authmiddleware, eventControllers.getMyEvents);
eventRouter.patch("/:eventid/review", authmiddleware, roleMiddleware, eventControllers.reviewEvent);
eventRouter.patch("/:eventid", authmiddleware, eventControllers.updateEvent);
eventRouter.patch("/:eventid/cancel", authmiddleware, eventControllers.cancelEvent);

export default eventRouter;