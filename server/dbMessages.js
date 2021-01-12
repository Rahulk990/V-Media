import mongoose from 'mongoose'

const chatSchema = mongoose.Schema({
    name:String,
    message:String,
    timestamp:String
})

export default mongoose.model('chatMessage', chatSchema);