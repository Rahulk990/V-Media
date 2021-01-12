import mongoose from 'mongoose'

const messages = mongoose.Schema({
    author:String,
    content:String,
    timestamp:String
})
const chatSchema = mongoose.Schema({
    title:String, // title of the group
    room_id:Number,
    type:String,
    users:[String], // Users Email Ids
    messages:[messages]
})

export default mongoose.model('chatMessage', chatSchema);