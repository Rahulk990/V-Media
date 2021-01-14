import mongoose from 'mongoose'

const messageModel = mongoose.Schema({
    author: String,
    content: String,
    timestamp: String
})

export const roomModel = mongoose.Schema({
    title: String, // Title
    roomId: Number,
    type: String,
    usersArray: [String], // Users Ids
    messagesArray: [messageModel]
});

export default mongoose.model('rooms', roomModel);
