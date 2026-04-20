import registrationServices from "../services/registrationServices.js";

const register = async (req, res) => {
    try{
        const userId = req.user._id;
        const eventId = req.params.eventid;
        if(!eventId){
            return res.status(400).json({message: "No event id found"});
        }
        const response = await registrationServices.register(userId, eventId);
        res.status(200).json({message: "Registered successfully", data: response});
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
}

export default {register};