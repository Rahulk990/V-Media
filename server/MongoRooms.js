import mongoose from 'mongoose'

const messageModel = mongoose.Schema({
    author: String, // User Id
    content: String,
    timestamp: String
})

const roomModel = mongoose.Schema({
    title: String,
    usersArray: [String],
    messagesArray: [messageModel]
});

export default mongoose.model('rooms', roomModel);
