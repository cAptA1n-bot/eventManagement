import eventServices from '../services/eventServices'

const createEvent = async(req, res) => {
    try{
        const {eventName, description, time, venue, capacity} = req.body;
        if(!eventName || !description || !time || !venue || !capacity){
            return res.status(400).send("All fields are required");
        }
        const admin = req.user;
        const event = await eventServices.createEvent(eventName, description, time, venue, capacity, admin);
        res.status(200).json({"message": "Event created successfully", "data": event});
    }
    catch(error){
        res.status(400).json({"message": error.message})
    }
}

export default {createEvent};