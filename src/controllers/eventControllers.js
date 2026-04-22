import eventServices from '../services/eventServices.js'

const createEvent = async(req, res) => {
    try{
        const {eventName, description, time, venue, capacity} = req.body;
        if(!eventName || !description || !time || !venue || !capacity){
            return res.status(400).send("All fields are required");
        }
        const admin = req.user._id;
        const event = await eventServices.createEvent(eventName, description, time, venue, capacity, admin);
        res.status(200).json({message: "Event created successfully", "data": event});
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

const getEvents = async (req, res) => {
    try{
        const userId = req.user._id;
        const filter = req.query.type;
        const allowedFilters = ['registered', 'unregistered'];
        if(filter && !allowedFilters.includes(filter)){
            return res.status(400).json({'message': 'Invalid Status'});
        }
        const events = await eventServices.getEvents(userId, filter);
        res.status(200).json({data: events});
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
}

const getMyEvents = async (req, res) => {
    try{
        const userId = req.user._id;
        const myEvents = await eventServices.getMyEvents(userId);
        res.status(200).json({data: myEvents});
    }
    catch(error){
        res.status(400).json({message: error.message});
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

export default {createEvent, getEvents, getMyEvents, reviewEvent};