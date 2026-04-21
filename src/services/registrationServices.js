import Event from '../models/event.js'
import Registration from '../models/registration.js';

const register = async (userId, eventId) => {
    const event = await Event.findOne({_id: eventId});
    if(!event || event.status !== 'active'){
        throw new Error("No such active event found");
    }
    if(event.admin.toString() === userId.toString()){
        throw new Error("Invalid action");
    }
    let response;
    if(event.currentGuest < event.capacity){
        response = await Registration.create({
            userId, 
            eventId
        })
        await Event.findByIdAndUpdate(eventId, {
            $inc: {currentGuest: 1}
        });
        return response;
    }
    else{
        throw new Error("Can not register. Event is full");
    }
}

const unregister = async (userId, eventId) => {
    const event = await Event.findOne({_id: eventId});
    if(!event || event.status !== 'active'){
        throw new Error("No such active event found");
    }
    if(event.admin.toString() === userId.toString()){
        throw new Error("Invalid action");
    }
    const registration = await Registration.find({userId, eventId});
    console.log(registration);
    
    if (!registration || registration.status === "unregistered") {
        throw new Error("User is not registered for this event");
    }
    if(registration.status === "registered"){
        registration.status = "unregistered";
        await registration.save();
        await Event.findByIdAndUpdate(eventId, {
        $inc: {currentGuest: -1}
    });
    }
   
}

export default {register, unregister};