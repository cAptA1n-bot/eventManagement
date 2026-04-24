import Event from '../models/event.js'
import Registration from '../models/registration.js';

const createEvent = async (eventName, description, time, venue, capacity, admin) => {
    const event = await Event.create({ eventName, description, time, venue, capacity, admin });
    return event;
}

const getEvents = async (userId, filter, date, location) => {
    const registrations = await Registration.find({ userId });

    const registeredEventsId = new Set(
        registrations.map(r => r.eventId.toString())
    )

    const query = {};
    if (date) {
        const start = new Date(`${date}T00:00:00.000+05:30`);
        const end = new Date(`${date}T23:59:59.999+05:30`);
        query.time = { $gte: start, $lte: end };
    }
    if (location) {
        query.venue = { $regex: location, $options: 'i' };
    }

    let events = await Event.find(query).lean();

    events = events.filter(event => {
        return event.admin.toString() !== userId.toString()
    })

    let result = events.map(event => ({
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
    if (event.status !== 'pending' && event.status !== 'active') {
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

const cancelEvent = async (userId, eventId) => {
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
        throw new Error("No such event found");
    }
    if (event.admin.toString() !== userId.toString()) {
        throw new Error("Unauthorized");
    }
    if (event.status !== 'pending' && event.status !== 'active') {
        throw new Error("Can't perform this action");
    }
    event.status = 'cancelled';
    event.save();
}

export default { createEvent, getEvents, getMyEvents, reviewEvent, updateEvent, cancelEvent }