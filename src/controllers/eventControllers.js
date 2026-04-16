const createEvent = async(req, res) => {
    try{
        
    }
    catch(error){
        res.status(400).json({"message": error.message})
    }
}

export default {createEvent};