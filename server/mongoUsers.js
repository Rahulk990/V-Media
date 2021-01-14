import mongoose from "mongoose";
// import { roomModel } from './MongoRooms.js'

const eventModel = mongoose.Schema({
    heading: String,
    description: String,
    timestamp: String
})

const userModel = mongoose.Schema({
    userId: String,
    name: String,
    avatar: String,
    email: String,
    eventsArray: [eventModel],
    roomsArray: [String]
});

export default mongoose.model("users", userModel);
