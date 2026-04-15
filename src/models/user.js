import mongoose from "mongoose";
import validators from "../utils/validator.js";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                try {
                    validators.emailValidator(value);
                    return true;
                } catch (err) {
                    return false;
                }
            },
            message: "Email id is invalid"
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                try {
                    validators.passwordValidator(value);
                    return true;
                } catch (err) {
                    return false;
                }
            },
            message: "Set a strong password"
        }
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'superAdmin'],
            message: '{VALUE} is not a valid role'
        },
        default: 'user'
    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);


export default User;