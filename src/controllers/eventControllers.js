import eventServices from '../services/eventServices.js'

const createEvent = async (req, res) => {
    try {
        const { eventName, description, time, venue, capacity } = req.body;
        if (!eventName || !description || !time || !venue || !capacity) {
            return res.status(400).send("All fields are required");
        }
        const admin = req.user._id;
        const event = await eventServices.createEvent(eventName, description, time, venue, capacity, admin);
        res.status(200).json({ message: "Event created successfully", "data": event });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getEvents = async (req, res) => {
    try {
        const userId = req.user._id;
        const filter = req.query.type;
        const date = req.query.date;
        const location = req.query.location;
        const allowedFilters = ['registered', 'unregistered'];
        if (date && isNaN(new Date(date).getTime())) {
            return res.status(400).json({
                message: "Invalid date format. Use YYYY-MM-DD"
            });
        }
        if (filter && !allowedFilters.includes(filter)) {
            return res.status(400).json({ 'message': 'Invalid Status' });
        }
        const events = await eventServices.getEvents(userId, filter, date, location);
        res.status(200).json({ data: events });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getMyEvents = async (req, res) => {
    try {
        const userId = req.user._id;
        const myEvents = await eventServices.getMyEvents(userId);
        res.status(200).json({ data: myEvents });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const reviewEvent = async (req, res) => {
    try {
        const eventId = req.params.eventid;
        const status = req.body.status;
        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        await eventServices.reviewEvent(eventId, status);

        res.status(204).send();

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const userId = req.user._id;
        const eventId = req.params.eventid;
        const updates = req.body;
        const allowedFields = ['eventName', 'description', 'capacity', 'time', 'venue'];
        const updateKeys = Object.keys(updates);
        const invalidFields = updateKeys.filter(
            key => !allowedFields.includes(key)
        );
        if (invalidFields.length > 0) {
            return res.status(400).json({
                message: "Invalid fields",
                invalidFields
            });
        }
        await eventServices.updateEvent(userId, eventId, updates);
        res.status(204).send();

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const cancelEvent = async (req, res) => {
    try {
        const userId = req.user._id;
        const eventId = req.params.eventid;
        await eventServices.cancelEvent(userId, eventId);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default { createEvent, getEvents, getMyEvents, reviewEvent, updateEvent, cancelEvent };