import mongoose from 'mongoose'

const messageModel = mongoose.Schema({
    userId: String,
    username: String,
    content: String,
    timestamp: String
})

const roomModel = mongoose.Schema({
    title: String,
    usersArray: [String],
    messagesArray: [messageModel]
});

export default mongoose.model('rooms', roomModel);
