import mongoose from "mongoose";

const eventModel = mongoose.Schema({
    heading: String,
    description: String,
    timestamp: String
})

const userModel = mongoose.Schema({
	name: String,
    avatar: String,
    eventsArray: [eventModel]
});

export default mongoose.model("users", userModel);
