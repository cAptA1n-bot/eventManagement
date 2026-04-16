import mongoose, { Schema } from 'mongoose'

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        minlen: 2,
        maxlen: 50,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlen: 10,
        maxlen: 300,
        trim: true
    },
    time: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true,
        minlen: 5,
        maxlen: 200,
        trim: true
    },
    capacity: {
        type: Number,
        required: true,
        min: 10,
        max: 100000
    },
    status: {
        type: String,
        enum:{
            values: ["pending", "active", "rejected", "cancelled", "ended"],
            message: '{VALUE} is not a valid status'
        },
        default: "pending"
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

const Model = mongoose.model.Event || mongoose.model("Event", eventSchema);

