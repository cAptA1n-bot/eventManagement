import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "event"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    status: {
        type: String,
        enum: {
            values: ["registered", "unregistered"],
            message: "{VALUE} is not a valid status"
        },
        default: "registered"
    }

}, {timestamps: true})

registrationSchema.index({userId: 1, eventId: 1}, {unique: true});

const Registration = mongoose.models.Registration || mongoose.model("Registration", registrationSchema);

export default Registration;