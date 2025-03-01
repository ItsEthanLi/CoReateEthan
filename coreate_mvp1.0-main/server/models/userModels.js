const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    clerk_id: {
        type: String,
        required: [true, "Please add a clerk_id"],
    },
    firstname: {
        type: String,
        required: [true, "Please add a firstname"]
    },
    lastname: {
        type: String,
        required: [true, "Please add a lastname"]
    },
    phone: {
        type: String,
        required: [true, "Please add a phone"]
    },
    bio: {
        type: String,
        required: [true, "Please add a bio"]
    },
    university: {
        type: String,
        required: [true, "Please add a university"]
    },
    level: {
        type: String,
        required: [true, "Please add a level"],
        enum: ["freshman", "sophomore", "junior", "senior"]
    },
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;