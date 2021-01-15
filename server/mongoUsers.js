import mongoose from "mongoose";

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
    roomsArray: [String],
    postsArray: [String]
});

export default mongoose.model("users", userModel);
