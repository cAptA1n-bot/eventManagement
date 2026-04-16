import Event from '../models/event.js'

const createEvent = async (eventName, description, time, venue, capacity, admin) => {
    const event = await Event.create({eventName, description, time, venue, capacity, admin});
    console.log(event);
}

export default {createEvent}