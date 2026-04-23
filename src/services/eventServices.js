import Event from '../models/event.js'
import Registration from '../models/registration.js';

const createEvent = async (eventName, description, time, venue, capacity, admin) => {
    const event = await Event.create({ eventName, description, time, venue, capacity, admin });
    return event;
}

const getEvents = async (userId, filter) => {
    const registrations = await Registration.find({ userId });

    const registeredEventsId = new Set(
        registrations.map(r => r.eventId.toString())
    )

    let events = await Event.find().lean();

    events = events.filter(event => {
        event.admin.toString() !== userId.toString()
    })

    const result = events.map(event => ({
        ...event,
        isRegistered: registeredEventsId.has(event._id.toString())
    }))
    if (filter === 'registered') {
        result = result.filter(r => r.isRegistered)
    }
    else if (filter === 'unregistered') {
        result = result.filter(r => !r.isRegistered);
    }
    return result;
}

const getMyEvents = async (userId) => {
    const myEvents = await Event.find({ admin: userId }).sort({ createdAt: -1 }).lean();
    return myEvents;
}

const reviewEvent = async (eventId, status) => {
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
        throw new Error("Event not found");
    }
    if (event.status !== 'pending') {
        throw new Error("Event already reviewd");
    }
    if (status === 'accepted') {
        event.status = 'active';
    }
    else if (status === 'rejected') {
        event.status = status;
    }

    await event.save();
}

const updateEvent = async (userId, eventId, updates) => {
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
        throw new Error("No such active event found");
    }
    if(event.status !== 'pending' && event.status !== 'active'){
        throw new Error("Can't update this event anymore");
    }
    if (event.admin.toString() !== userId.toString()) {
        throw new Error("Unauthorized");
    }
    const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        updates,
        { returnDocument: 'after', runValidators: true }
    );
}

export default { createEvent, getEvents, getMyEvents, reviewEvent, updateEvent }